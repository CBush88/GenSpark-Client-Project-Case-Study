import { useState, useEffect } from 'react';
import './App.css';
import Clients from './components/Clients';
import { getClients } from './services/ClientsData';
import { getProjects } from './services/ProjectsData';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddClient from './components/AddClient';
import Header from './components/Header';
import Footer from './components/Footer';
import AddProject from './components/AddProject';
import UpdateClient from './components/UpdateClient';
import UpdateProject from './components/UpdateProject';
import Client from './components/Client';

function App() {

  const [clients, setClients] = useState([])

  const retrieveClients = () => {
    getClients()
    .then(res => {
      setClients(res.data)
    })
    .catch(err => console.log(err.response))
  }

  const [projects, setProjects] = useState([])

  const retrieveProjects = () => {
    getProjects()
    .then(res => {
      setProjects(res.data)
    })
    .catch(err => console.log(err.response))
  }

  const [helper, setHelper] = useState({})

  useEffect(() => {
    retrieveClients()
  }, [])
  

  return (
    <div className="App">
      <div className='container'>
        <Header />
      <Router>
        <Routes>
          <Route path='/' element={<Clients clients={clients} setClients={setClients} setHelper={setHelper} retrieveClients={retrieveClients} retrieveProjects={retrieveProjects} />} />
          <Route path='/client' element={<Client single={true} client={helper} setClient={setHelper} setClients={setClients} clients={clients} />} />
          <Route path='/addproject' element={<AddProject client={helper} setClient={setHelper} setClients={setClients} clients={clients} />} />
          <Route path='/addclient' element={<AddClient />} />
          <Route path='/updateclient' element={<UpdateClient helper={helper} setHelper={setHelper} clients={clients} setClients={setClients} />} />
          <Route path='/updateproject' element={<UpdateProject helper={helper} setHelper={setHelper} clients={clients} setClients={setClients} />} />
        </Routes>
      </Router>
      <Footer />
      </div>
    </div>
  );
}

export default App;
