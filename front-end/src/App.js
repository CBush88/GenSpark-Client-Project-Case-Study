import { useState } from 'react';
import './App.css';
import Clients from './components/Clients';
import { getClients } from './services/ClientsData';
import { getProjects } from './services/ProjectsData';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Projects from './components/Projects';
import AddClient from './components/AddClient';

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

  return (
    <div className="App">
      <div className='container'>
      <Router>
        <Routes>
          <Route path='/' element={<Clients clients={clients} setClients={setClients} retrieveClients={retrieveClients} />} />
          <Route path='/projects' element={<Projects projects={projects} setProjects={setProjects} retrieveProjects={retrieveProjects} />} />
          <Route path='/addclient' element={<AddClient setClients={setClients} projects={projects} retrieveProjects={retrieveProjects} />} />
        </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;
