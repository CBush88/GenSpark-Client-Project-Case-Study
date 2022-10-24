import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Login = (props) => {

    const {userAttempt, setUserAttempt, retrieveUsers, authenticate} = props

    Login.propTypes = {
        userAttempt: PropTypes.object,
        setUserAttempt: PropTypes.func,
        retrieveUsers: PropTypes.func,
        authenticate: PropTypes.func,
    }

    useEffect(() => {
      retrieveUsers()
    }, [])
    

    const handleChanges = (e) =>{
        setUserAttempt({
            ...userAttempt,
            [e.target.name]: e.target.value
        })
    }

  return (
    <div>
        <h5>Log in or Sign up</h5>
        <form onSubmit={authenticate} style={{margin:"auto"}} className='d-flex flex-column align-items-start w-50'>
            <label htmlFor='username' className='form-label label'>Username</label>
            <input type='text' name='username' id='username' required={true} onChange={handleChanges} className='form-control form-control-lg' placeholder='Username' />
            <label htmlFor='password' className='form-label label'>Password</label>
            <input type='password' name='password' id='password' required={true} onChange={handleChanges} className='form-control form-control-lg' placeholder='Password' />
            <label name='errLabel' id='errLabel' style={{color:"red"}}></label>
            <button type='submit' className='btn btn-primary mt-3'>Log In</button>
            <Link to="/signup" style={{marginTop:"1em"}} >Sign Up</Link>
        </form>
    </div>
  )
}

export default Login