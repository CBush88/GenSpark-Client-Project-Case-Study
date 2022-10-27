import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateProject } from '../services/ProjectsData'
import PropTypes from 'prop-types'
import { projectValidation } from '../services/Validation'

const UpdateProject = (props) => {

    const {helper, setHelper, clients, setClients} = props

    UpdateProject.propTypes = {
        helper: PropTypes.object,
        clients: PropTypes.array,
        setClients: PropTypes.func,
    }
    

    const width={width:"20%"}

    const [updatedClient, setUpdatedClient] = useState(helper.client)  //Why doesn't this do anything?!?!?!

    const [updatedProject, setUpdatedProject] = useState(helper.project)

    const navigate = useNavigate()

    const handleChanges = (e) => {
        setUpdatedProject({
            ...updatedProject,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(projectValidation(updatedProject)){
            updateProject(updatedProject)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err.response))
            const updatedProjects = helper.client.projects.map((project) => {
                if(project.projectId === helper.project.projectId){
                    return updatedProject
                }else{
                    return project
                }
            })
            helper.setProjects(updatedProjects)

            setUpdatedClient({...updatedClient, "projects": updatedProjects})

            const theUpdated = {
                "clientId": updatedClient.clientId,
                "clientName": updatedClient.clientName,
                "clientEmail": updatedClient.clientEmail,
                "projects": updatedProjects,
                "signedAgreement": updatedClient.signedAgreement
            }
            
            const updatedClients = clients.map(client => {
                if(client.clientId === updatedClient.clientId){
                    return theUpdated
                }else{
                    return client
                }
            })
            setClients(updatedClients)
            helper.setProject(helper)
            setHelper({"client": theUpdated})
            navigate(-1)
        }
    }

  return (
    <>
        <form onSubmit={onSubmit}>
            <div className='row'>
                <div className='col-2 text-start'>
                    <label htmlFor='projectId'>Project ID</label>
                </div>
                <div className='col-5 text-start'>
                    <label htmlFor='projectName'>Project Name</label>
                </div>
                <div className='col text-start'>
                    <label htmlFor='projectDescription'>Project Description</label>
                </div>
            </div>
            <div className='row'>
                <div className='col-2 text-start'>
                    {updatedProject.projectId}
                </div>
                <div className='col-5 text-start'>
                    <input className='w-75' type='text' name='projectName' id='projectName' value={updatedProject.projectName} onChange={handleChanges} minLength={3} required ></input>
                </div>
                <div className='col text-start'>
                    <input className='w-100' type='text' name='projectDescription' id='projectDescription' value={updatedProject.projectDescription} onChange={handleChanges} minLength={3} required ></input>
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

export default UpdateProject