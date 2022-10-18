import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateClient } from '../services/ClientsData'

const AddProject = (props) => {

    const navigate = useNavigate()

    const initialState = {
        "projectName": "",
        "projectDescription": "",
    }

    const projects = props.client.projects

    const [project, setProject] = useState(initialState)

    const handleChanges = (e) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        projects.push(project)
        props.setClient({
            ...props.client,
            "projects": projects
        })
        updateClient(props.client)
        .then((res) => props.setClients(
            ...props.clients,
            res.data
        ))
        .then(() => navigate("/"))
    }
        
  return (
    <>
        <form>
            <div className='row'>
                <div className='col col-sm-3'>
                    <label htmlFor='projectName'>Project Name:</label>
                </div>
                <div className='col col-sm-9'>
                    <input className='form-control' type='text' placeholder='Project Name' name='projectName' id='projectName' onChange={handleChanges} value={project.projectName} required={true} />
                </div>
            </div>
            <div className='row'>
                <div className='col col-sm-3'>
                    <label htmlFor='projectDescription'>Project Description:</label>
                </div>
                <div className='col col-sm-9'>
                    <input className='form-control' type='text' placeholder='Project Description' name='projectDescription' id='projectDescription' onChange={handleChanges} value={project.projectDescription} required={true} />
                </div>
            </div>
            <div className='text-start'>
                <button className='btn btn-sm btn-success' onClick={onSubmit}>Add</button>
            </div>
        </form>
    </>
  )
}

export default AddProject