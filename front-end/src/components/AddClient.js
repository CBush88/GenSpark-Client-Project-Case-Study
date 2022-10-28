import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { addClient } from '../services/ClientsData';
import { clientValidation, emailAvailable } from '../services/Validation';
import PropTypes from 'prop-types'

const AddClient = (props) => {

    AddClient.propTypes = {
        clients: PropTypes.array,
    }

    const clients = props;  //Somehow not an array??

    const initialState = {
        "clientName": "",
        "clientEmail": "",
        "signedAgreement": null,
        "projects":[]
    }

    const [client, setClient] = useState(initialState)

    const navigate = useNavigate()

    const handleChanges = (e) => {
        setClient({
            ...client,
            [e.target.name]: e.target.value
        })
    }

    const handleFile = async (e) => {
        let reader = new FileReader()
        let base64
        reader.onload = (ev) =>{
            base64 = ev.target.result
            setClient({
                ...client,
                [e.target.name]: base64
            })
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(clientValidation(client) && emailAvailable(client, props.clients)){
            addClient(client)
            .then(res => console.log(res.data))
            .then(() => setClient(initialState))
            .then(() => navigate(-1))
            .catch((err) => console.log(err.response))
        }
    }

  return (
    <div>
        <form onSubmit={onSubmit} encType='multipart/form-data'>
            <div className='row'>
                <div className='col col-sm-2'>
                <label htmlFor='clientName'>Client Name:</label>
                </div>
                <div className='col col-sm-10'>
                <input className='form-control' type="text" placeholder='Client Name' name='clientName' id='clientName' onChange={handleChanges} required={true} minLength={3} />
            </div>
            </div>
            <br />
            <div className='row'>
                <div className='col col-sm-2'>
                <label htmlFor='clientEmail'>Client Email:</label>
                </div>
                <div className='col col-sm-10'>
                <input type="text" name='clientEmail' id='clientEmail' pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$' className='form-control' placeholder='Client Email' onChange={handleChanges} />
            </div>
            </div>
            <br />
            <div className='row'>
                <div className='col col-sm-2'>
                <label htmlFor='signedAgreement'>Signed Agreement:</label>
                </div>
                <div className='col col-sm-10'>
                <input className='form-control' type="file" name='signedAgreement' id='signedAgreement' onChange={handleFile} accept="application/pdf" required={true} />
            </div>
            </div>
            <br />
            <div className='text-start'>
            <button type='submit' className='btn btn-sm btn-outline-success'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddClient