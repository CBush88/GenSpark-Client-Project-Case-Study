import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateClient } from '../services/ClientsData'
import PropTypes from 'prop-types'
import { projectValidation } from '../services/Validation'

const AddProject = (props) => {

    const {helper, setHelper, setClients, clients} = props

    AddProject.propTypes = {
        helper: PropTypes.object,
        setHelper: PropTypes.func,
        setClients: PropTypes.func,
        clients: PropTypes.array
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
            // setHelper({
            //     ...helper.client,
            //     "projects": projects
            // })
            updateClient(helper.client)
            .then((res) => {
                console.log(res.data)
                helper.setClient(
                    res.data
                )
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