import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateClient } from '../services/ClientsData'
import PropTypes from 'prop-types'
import Clients from './Clients'

const UpdateClient = (props) => {

    const {helper, setHelper, clients, setClients} = props

    UpdateClient.propTypes = {
        helper: PropTypes.object,
        setHelper: PropTypes.func,
    }


    const width = {width:"20%"}

    const [updatedClient, setUpdatedClient] = useState(helper.client)

    const handleChanges = (e) =>{
        setUpdatedClient({
            ...updatedClient,
            [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate()

    const onSubmit = () =>{
        updateClient(updatedClient)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.response))
        helper.setClient(updatedClient)
        setHelper({"client": updatedClient})
        const updatedClients = clients.map((client) => {
            if(client.clientId === updatedClient.clientId){
                return updatedClient
            }else{
                return client
            }
        })
        setClients(updatedClients)
        navigate("/")
    }

  return (
    <>
        <table className='table table-sm table-borderless text-start'>
            <thead>
                <tr>
                <th style={width}>
                        Client Id
                    </th>
                    <th style={width}>
                        Client Name
                    </th>
                    <th style={width}>
                        Client Email
                    </th>
                    <th style={width}>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style={width}>
                        {updatedClient.clientId}
                    </td>
                    <td style={width}>
                        <input className='form-control form-control-sm' type='text' value={updatedClient.clientName} name='clientName' id='clientName' onChange={handleChanges} />
                    </td>
                    <td style={width}>
                        <input className='form-control form-control-sm' type='text' value={updatedClient.clientEmail} name='clientEmail' id='clientEmail' onChange={handleChanges} />
                    </td>
                    <td style={width}>
                        <button className='btn btn-sm btn-outline-success' onClick={onSubmit}>Save</button>
                    </td>
                </tr>
                </tbody>
        </table>
        
    </>
  )
}

export default UpdateClient