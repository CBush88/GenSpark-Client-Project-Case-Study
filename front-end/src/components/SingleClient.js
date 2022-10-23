import React, { useEffect, useState } from 'react'
import { getClientById } from '../services/ClientsData'
import Client from './Client'

const SingleClient = ({retrieveClients, setHelper, clients, setClients}) => {    
    
    useEffect(() => {
            retrieveClients()
        },[])

    const [client, setClient] = useState({"clientId": null})
    const [clientId, setClientId] = useState("-1")

    const clientsArr = Array.from(clients)

    const handleChanges = (e) => {
        setClientId(e.target.value)
    }

    const loadClient = () =>{
        getClientById(clientId)
        .then((res) => {
            setClient(res.data)
        })
        .catch((err) => console.log(err.response))
    }

    
    
    
  return (
    <div>
        <div className='row'>
        <label className='col-3' htmlFor='clientId'>Select a client to view</label>
        <select className='col-5' name='clientId' id='clientId' defaultValue='-1' onChange={handleChanges} >
            <option disabled value='-1'>Select a client</option>
            {clientsArr.map((client) =>(
                <option key={client.clientId} value={client.clientId}>
                    {client.clientName}
                </option>
            ))}
        </select>
        <button className='btn btn-sm btn-outline-success col-1' style={{marginLeft:"1em"}} onClick={loadClient} >Select</button>
        </div>
        {client.clientId != null && <Client client={client} clients={clients} setClients={setClients} setHelper={setHelper} />}    
    </div>
  )
}

export default SingleClient