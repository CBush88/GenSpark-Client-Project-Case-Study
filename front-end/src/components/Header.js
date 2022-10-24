import React from 'react'
import { Link } from 'react-router-dom'

const Header = (props) => {

    const {token} = props

  return (
    <div className='w-100'>
        <nav className='nav navbar navbar-light bg-light'>
          <div className='container-fluid'>
            <Link className='navbar-brand' to="/">Client Management</Link>
            {token !== null &&<Link className='nav-link' to="/">Home</Link>}
            {token !== null &&<Link className='nav-link' to="/clients">Client List</Link>}
            {token !== null &&<Link className='nav-link' to="/client">Client</Link>}
            {token !== null &&<Link className='nav-link' to="/addclient">Add Client</Link>}
            {token === null &&<Link className='nav-link' to='signup'>Sign Up</Link>}
            {token !== null &&<a className='nav-link' href="/">Log out</a>}
          </div>
        </nav>
    </div>
  )
}

export default Header