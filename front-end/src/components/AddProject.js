import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateClient } from '../services/ClientsData'
import PropTypes from 'prop-types'
import { projectValidation } from '../services/Validation'

const AddProject = (props) => {

    const {helper, setHelper, setClients, clients, token} = props

    AddProject.propTypes = {
        helper: PropTypes.object,
        setHelper: PropTypes.func,
        setClients: PropTypes.func,
        clients: PropTypes.array,
        token: PropTypes.object,
    }

    const navigate = useNavigate()

    const initialState = {
        "projectName": "",
        "projectDescription": "",
    }

    const projects = helper.client.projects

    const [project, setProject] = useState(initialState)

    const handleChanges = (e) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(projectValidation(project)){
            projects.push(project)
            updateClient(helper.client)
            .then((res) => {
                console.log(res.data)
                setHelper({"client": res.data})
                const updatedClients = clients.map(client => {
                    if(client.clientId === helper.client.clientId){
                        return res.data
                    }else{
                        return client
                    }
                })
                setClients(updatedClients)
            })
            .then(() => navigate(-1))
            .catch(err => console.log(err.response))
        }
    }
        
  return (
    <>
        <form onSubmit={onSubmit}>
            <div className='row'>
                <div className='col col-sm-3'>
                    <label htmlFor='projectName'>Project Name:</label>
                </div>
                <div className='col col-sm-9'>
                    <input className='form-control' type='text' placeholder='Project Name' name='projectName' id='projectName' onChange={handleChanges} value={project.projectName} required={true} minLength={3} />
                </div>
            </div>
            <div className='row'>
                <div className='col col-sm-3'>
                    <label htmlFor='projectDescription'>Project Description:</label>
                </div>
                <div className='col col-sm-9'>
                    <input className='form-control' type='text' placeholder='Project Description' name='projectDescription' id='projectDescription' onChange={handleChanges} value={project.projectDescription} required={true} minLength={3} />
                </div>
            </div>
            {(token.role === "view")? "" : <div className='text-start'>
                <button type='submit' className='btn btn-sm btn-success'>Add</button>
            </div>}
        </form>
    </>
  )
}

export default AddProject