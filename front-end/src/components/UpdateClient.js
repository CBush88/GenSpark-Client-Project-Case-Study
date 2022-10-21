import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateClient } from '../services/ClientsData'

const UpdateClient = (props) => {

    const width = {width:"20%"}

    const [updatedClient, setUpdatedClient] = useState(props.helper)

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
        .then(() => props.setClients({
            ...props.clients,
            updatedClient
        }))
        .then(() => props.setHelper(null))
        .then(() => navigate("/"))
        .catch((err) => console.log(err.response))
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
                        {props.helper.clientId}
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