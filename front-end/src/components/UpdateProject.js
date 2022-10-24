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
            props.setHelper({"client": theUpdated})
            navigate(-1)
        }
    }

  return (
    <>
        <table className='table table-borderless table-sm text-start'>
        <thead>
            <tr>
                <th style={width}>
                    <label htmlFor='save'>Manage Project</label>
                </th>
                <th style={width}>
                    <label htmlFor='projectId'>Project Id</label>
                </th>
                <th style={width}>
                    <label htmlFor='projectName'>Project Name</label>
                </th>
                <th style={width}>
                    <label htmlFor='projectDescription' >Project Description</label>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td style={width}>
        <button className='btn btn-sm btn-outline-success' name='save' id='save' onClick={onSubmit}>Save</button>
        </td>
        <td style={width}>
            <label name='projectId' id='projectId'>{updatedProject.projectId}</label>
        </td>
        <td style={width}>
            <input className='form-control form-control-sm' type='text' value={updatedProject.projectName} name='projectName' id='projectName' onChange={handleChanges} />
        </td>
        <td style={width}>
            <input className='form-control form-control-sm' type='text' value={updatedProject.projectDescription} name='projectDescription' id='projectDescription' onChange={handleChanges} />
        </td>
            </tr>
        </tbody>
        </table>
    </>
  )
}

export default UpdateProject