import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { addClient } from '../services/ClientsData';

const AddClient = (props) => {
    const margin = {marginLeft:"2em"}

    const initialState = {
        "clientName": "",
        "clientEmail": "",
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

    const onSubmit = (e) => {
        e.preventDefault()
        addClient(client)
        .then(() => setClient(initialState))
        .then(() => navigate("/"))
        .catch((err) => console.log(err.response))
    }

    useEffect(() => {
      props.retrieveProjects()
    }, [])
    

  return (
    <div>
        <form>
            <div className='row'>
                <div className='col col-sm-2'>
                <label htmlFor='clientName'>Client Name:</label>
                </div>
                <div className='col col-sm-10'>
                <input className='form-control' type="text" placeholder='Client Name' name='clientName' id='clientName' onChange={handleChanges} required={true} />
            </div>
            </div>
            <br />
            <div className='row'>
                <div className='col col-sm-2'>
                <label htmlFor='clientEmail'>Client Email:</label>
                </div>
                <div className='col col-sm-10'>
                <input className='form-control' type="text" placeholder='Client Email' name='clientEmail' id='clientEmail' onChange={handleChanges} required={true} />
            </div>
            </div>
            <br />

            <div className='row'>
                <div className='col col-sm-2'>
                <label htmlFor='signedAgreement'>Signed Agreement:</label>
                </div>
                <div className='col col-sm-10'>
                <input className='form-control' type="file" name='signedAgreement' id='signedAgreement' onChange={handleChanges} accept=".pdf" />
            </div>
            </div>
            <br />

            <div className='text-start'>
            <button className='btn btn-sm btn-outline-success' style={margin} onClick={onSubmit}>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddClient