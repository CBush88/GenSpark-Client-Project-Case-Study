import React, { useEffect, useState } from 'react'
import { getClientById } from '../services/ClientsData'
import Client from './Client'
import PropTypes from 'prop-types'

const SingleClient = (props) => {  

    const {retrieveClients, helper, setHelper, clients, setClients, token} = props
    
    SingleClient.propTypes = {
        retrieveClients: PropTypes.func,
        setHelper: PropTypes.func,
        clients: PropTypes.array,
        setClients: PropTypes.func,
        token: PropTypes.object,
    }
    
    useEffect(() => {
        retrieveClients()
    },[])

    const initialClient = (helper!== null && helper.client !== null)? helper.client : {"clientId": null}

    const [client, setClient] = useState(initialClient)
    const [clientId, setClientId] = useState("-1")
   
    const clientsArr = Array.from(clients)

    const handleChanges = (e) => {
        setClientId(e.target.value)
    }

    const loadClient = () =>{
        if(clientId !== -1){
            getClientById(clientId)
            .then((res) => {
                setClient(res.data)
                setHelper({"client": res.data})
            })
            .catch((err) => console.log(err.response))
        }
    }

    useEffect(() => {
        setClient(initialClient)
        setClientId("-1")
    }, [clients])
    

    
    
    
  return (
    <div>
        <div className='row'>
        <label className='col-3' htmlFor='clientId'>Select a client to view</label>
        <select className='col-5' name='clientId' id='clientId' value={clientId} onChange={handleChanges} >
            <option disabled value='-1'>Select a client</option>
            {clientsArr.map((client) =>(
                <option key={client.clientId} value={client.clientId}>
                    {client.clientName}
                </option>
            ))}
        </select>
        <button className='btn btn-sm btn-outline-success col-1' style={{marginLeft:"1em"}} onClick={loadClient} >Select</button>
        </div>
        {client.clientId != null && <Client client={client} clients={clients} setClients={setClients} setHelper={setHelper} needsRefresh={true} token={token} />}    
    </div>
  )
}

export default SingleClient