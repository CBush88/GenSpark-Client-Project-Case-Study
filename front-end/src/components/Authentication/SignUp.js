import React, { useEffect, useState } from 'react'
import bcrypt from 'bcryptjs'
import { addUser } from '../../services/UsersData'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const SignUp = (props) => {

    const{users, setUsers, retrieveUsers} = props

    SignUp.propTypes = {
        users: PropTypes.array,
        setUsers: PropTypes.func,
        retrieveUsers: PropTypes.func,
    }

    useEffect(() => {
        retrieveUsers()
    }, [])
    

    const initialState = {
        "username": "",
        "password": "",
        "role": ""
    }

    const navigate = useNavigate()

    const [newUser, setNewUser] = useState(initialState)
    const [confirmPassword, setConfirmPassword] = useState()

    const isPasswordMatch = () =>{
        return (confirmPassword === newUser.password)
    }

    const handleChanges = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    const checkAvailable = () =>{
        let isUsernameAvailable = true
        users.forEach((user) => {
            if(user.username === newUser.username){
                isUsernameAvailable = false
            }
        })
        return isUsernameAvailable
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const errLabel = document.getElementById('errLabel')
        if(checkAvailable()){
            if(isPasswordMatch()){
                const hashed = bcrypt.hashSync(newUser.password, 10)
                const newUserHashed = {
                    "username": newUser.username,
                    "password": hashed,
                    "role": newUser.role
                }
                addUser(newUserHashed)
                .then(res => {
                    console.log(res.data)
                    setUsers([
                        ...users,
                        res.data
                    ])
                })
                .then(navigate("/"))
                .catch(err => console.log(err.response))
        }else{
            errLabel.textContent = "Passwords must match!"
        }}else{
            errLabel.textContent = "This username has already been taken!"
        }
    }

  return (
    <div className='d-flex justify-content-center mt-3'>
        <form onSubmit={handleSubmit} className='d-flex flex-column align-items-start w-50'>
            <h5>Sign Up:</h5>
            <label htmlFor='username' className='form-label label'>Username</label>
            <input type='text' name='username' id='username' required={true} pattern="\w+" onChange={handleChanges} className='form-control form-control-lg' value={newUser.username} ></input>
            <label htmlFor='password' className='form-label label'>Password</label>
            <input type='password' name='password' id='password' minLength={8} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title='At least one number, lowercase, and uppercase letter, 8+ characters' required={true} onChange={handleChanges} className='form-control form-control-lg' value={newUser.password} />
            <label htmlFor='repeatPassword' className='form-label label'>Repeat Password</label>
            <input type='password' name='repeatPassword' id='repeatPassword' minLength={8} required={true} className='form-control form-control-lg' onChange={(e) => setConfirmPassword(e.target.value)} />
            <label id='errLabel' style={{color:"red"}} className='form-label label'></label>
            <br />
            <button type='submit' className='btn btn-primary mt-3'>Sign Up</button>
        </form>
    </div>
  )
}

export default SignUp