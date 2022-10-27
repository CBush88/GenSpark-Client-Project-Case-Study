import React from 'react'
import Login from './Authentication/Login'

const Home = (props) => {

    const {userAttempt, setUserAttempt, retrieveUsers, authenticate, token} = props

  return (
    <div>
        <h3>Welcome to Client Management</h3>
        <p>Here you can manage your clients as well as the projects that they currently have.</p>
        <p>Clients and Projects can be added, modified, or cancelled.</p>
        {token === null && <Login userAttempt={props.userAttempt} setUserAttempt={props.setUserAttempt} retrieveUsers={props.retrieveUsers} authenticate={props.authenticate} />}
    </div>
  )
}

export default Home