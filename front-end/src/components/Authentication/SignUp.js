import React, { useState } from 'react'
import bcrypt from 'bcryptjs'
import { addUser } from '../../services/UsersData'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

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

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(isPasswordMatch()){
            const hashed = bcrypt.hashSync(newUser.password, 10)
            const newUserHashed = {
                "username": newUser.username,
                "password": hashed,
                "role": newUser.role
            }
            alert(JSON.stringify(newUserHashed))
            addUser(newUserHashed)
            .then(res => console.log(res.data))
            .then(navigate("/"))
            .catch(err => console.log(err.response))
        }else{
            return false
        }
    }

  return (
    <div className='d-flex justify-content-center mt-3'>
        <form onSubmit={handleSubmit} className='d-flex flex-column align-items-start w-50'>
            <h1 className='border-bottom border-dark border-2 pb-3'>Sign Up Below:</h1>
            <label htmlFor='username' className='form-label label'>Username</label>
            <input type='text' name='username' id='username' required={true} pattern="\w+" onChange={handleChanges} className='form-control form-control-lg' value={newUser.username} ></input>
            <br />
            <label htmlFor='password' className='form-label label'>Password</label>
            <input type='password' name='password' id='password' minLength={8} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required={true} onChange={handleChanges} className='form-control form-control-lg' value={newUser.password} />
            <br />
            <label htmlFor='repeatPassword' className='form-label label'>Repeat Password</label>
            <input type='password' name='repeatPassword' id='repeatPassword' minLength={8} required={true} className='form-control form-control-lg' onChange={(e) => setConfirmPassword(e.target.value)} />
            <br />
            <label id='errLabel' className='form-label label'></label>
            <br />
            <button type='submit' className='btn btn-primary mt-3'>Sign Up</button>
        </form>
    </div>
  )
}

export default SignUp