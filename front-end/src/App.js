import { useState } from 'react';
import './App.css';
import Clients from './components/Clients';
import { getClients } from './services/ClientsData';

function App() {

  const [clients, setClients] = useState([])

  const retrieveClients = () => {
    getClients()
    .then(res => {
      setClients(res.data)
    })
    .catch(err => console.log(err.response))
  }

  return (
    <div className="App">
      <div className='container'>
      <Clients clients={clients} setClients={setClients} retrieveClients={retrieveClients} />
      </div>
    </div>
  );
}

export default App;
