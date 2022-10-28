import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateClient } from '../services/ClientsData'
import PropTypes from 'prop-types'
import { clientValidation, emailAvailable } from '../services/Validation'

const UpdateClient = (props) => {

    const {helper, setHelper, clients, setClients} = props

    UpdateClient.propTypes = {
        helper: PropTypes.object,
        setHelper: PropTypes.func,
        clients: PropTypes.array,
        setClients: PropTypes.func,
    }


    const [updatedClient, setUpdatedClient] = useState(helper.client)

    const handleChanges = (e) =>{
        setUpdatedClient({
            ...updatedClient,
            [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate()

    const onSubmit = (e) =>{
        e.preventDefault()
        if(clientValidation(updatedClient) && emailAvailable(updatedClient, clients)){
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
            navigate(-1)
        }
    }

  return (
    <>
        <form onSubmit={onSubmit}>
            <div className='row'>
                <div className='col-2 text-start'>
                    <label htmlFor='clientId'>Client ID</label>
                </div>
                <div className='col-5 text-start'>
                    <label htmlFor='clientName'>Client Name</label>
                </div>
                <div className='col text-start'>
                    <label htmlFor='clientEmail'>Client Email</label>
                </div>
            </div>
            <div className='row'>
                <div className='col-2 text-start'>
                    {updatedClient.clientId}
                </div>
                <div className='col-5 text-start'>
                    <input className='w-75' type='text' name='clientName' id='clientName' value={updatedClient.clientName} onChange={handleChanges} minLength={3} ></input>
                </div>
                <div className='col text-start'>
                    <input className='w-75' type='text' name='clientEmail' id='clientEmail' pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$' title='Please enter a valid email address' value={updatedClient.clientEmail} onChange={handleChanges} ></input>
                </div>
            </div>
            <div className='text-start'>
                <br />
                <button className='btn btn-outline-success' type='submit'>Update</button>
            </div>
        </form>     
    </>
  )
}

export default UpdateClient