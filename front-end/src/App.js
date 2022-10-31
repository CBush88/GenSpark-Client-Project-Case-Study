import { useState } from 'react';
import './App.css';
import Clients from './components/Clients';
import { getClients } from './services/ClientsData';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddClient from './components/AddClient';
import Header from './components/Header';
import Footer from './components/Footer';
import AddProject from './components/AddProject';
import UpdateClient from './components/UpdateClient';
import UpdateProject from './components/UpdateProject';
import SingleClient from './components/SingleClient';
import { getUsers } from './services/UsersData';
import Login from './components/Authentication/Login';
import SignUp from './components/Authentication/SignUp';
import bcrypt from 'bcryptjs'
import Home from './components/Home';

function App() {

  const [clients, setClients] = useState([])

  const retrieveClients = () => {
    getClients()
    .then(res => {
      setClients(res.data)
    })
    .catch(err => console.log(err.response))
  }

  const [helper, setHelper] = useState({"client": null})

  const [users, setUsers] = useState([])
  const [token, setToken] = useState(null)
  const [userAttempt, setUserAttempt] = useState()

  const retrieveUsers = () => {
    getUsers()
    .then(res => {
      setUsers(res.data)
    })
    .catch(err => console.log(err.response))
  }

  const authenticate = (e) =>{
    e.preventDefault()
    users.forEach(user =>{
      if(user.username === userAttempt.username){
        if(bcrypt.compareSync(userAttempt.password, user.password)){
          setToken({"username": user.username, "role": user.role})
        }
      }
    })
    if(token === null){
      const errLabel = document.getElementById('errLabel')
      errLabel.textContent = "Invalid username or password!"
    }
    alert(JSON.stringify(token))
  }

  if(token === null){
    return(
      <div className="App">
        <div className='container h-100'>
        <Router>
          <Header token={token} />
          <Routes>
            <Route path='/' element={<Home userAttempt={userAttempt} setUserAttempt={setUserAttempt} retrieveUsers={retrieveUsers} authenticate={authenticate} token={token} />} />
            <Route path='/login' element={<Login userAttempt={userAttempt} setUserAttempt={setUserAttempt} retrieveUsers={retrieveUsers} authenticate={authenticate} />} />
            <Route path='/signup' element={<SignUp users={users} setUsers={setUsers} retrieveUsers={retrieveUsers} />} />
          </Routes>
          <Footer />
        </Router>
        </div>
      </div>
    )
  }else {
  return (
    <div className="App">
      <div className='container'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home userAttempt={userAttempt} setUserAttempt={setUserAttempt} retrieveUsers={retrieveUsers} authenticate={authenticate} token={token} />} />
          <Route path='/clients' element={<Clients clients={clients} setClients={setClients} setHelper={setHelper} retrieveClients={retrieveClients} token={token} />} />
          <Route path='/client' element={<SingleClient retrieveClients={retrieveClients} helper={helper} setHelper={setHelper} setClients={setClients} clients={clients} token={token} />} />
          <Route path='/addproject' element={<AddProject helper={helper} setHelper={setHelper} setClients={setClients} clients={clients} token={token} />} />
          <Route path='/addclient' element={<AddClient clients={clients} token={token} />} />
          <Route path='/updateclient' element={<UpdateClient helper={helper} setHelper={setHelper} clients={clients} setClients={setClients} token={token} />} />
          <Route path='/updateproject' element={<UpdateProject helper={helper} setHelper={setHelper} clients={clients} setClients={setClients} token={token} />} />
        </Routes>
        <Footer />
      </Router>
      </div>
    </div>
  );
  }
}

export default App;
