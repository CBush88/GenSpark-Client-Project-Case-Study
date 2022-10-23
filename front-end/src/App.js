import { useState, useEffect } from 'react';
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

function App() {

  const [clients, setClients] = useState([])

  const retrieveClients = () => {
    getClients()
    .then(res => {
      setClients(res.data)
    })
    .catch(err => console.log(err.response))
  }

  const [helper, setHelper] = useState()

  useEffect(() => {
    retrieveClients()
  }, [])
  

  return (
    <div className="App">
      <div className='container'>
        <Header />
      <Router>
        <Routes>
          <Route path='/' element={<Clients clients={clients} setClients={setClients} setHelper={setHelper} retrieveClients={retrieveClients} />} />
          <Route path='/client' element={<SingleClient retrieveClients={retrieveClients} setHelper={setHelper} setClients={setClients} clients={clients} />} />
          <Route path='/addproject' element={<AddProject helper={helper} setHelper={setHelper} setClients={setClients} clients={clients} />} />
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
