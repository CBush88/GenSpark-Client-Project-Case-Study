import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateProject } from '../services/ProjectsData'

const UpdateProject = (props) => {
    

    const width={width:"20%"}
    const [updatedClient, setUpdatedClient] = useState(props.helper.client)
    const [updatedProject, setUpdatedProject] = useState(props.helper.project)
    const [projects, setProjects] = useState(props.helper.client.projects)
    const navigate = useNavigate()

    const handleChanges = (e) => {
        setUpdatedProject({
            ...updatedProject,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = () => {
        updateProject(updatedProject)
        .then((res) => console.log(res.data))
        .then(setProjects({
            ...projects,
            updatedProject
        }))
        .then(setUpdatedClient({
            ...updatedClient,
            "projects": updatedProject
        }))
        .then(props.setClients({
            ...props.clients,
            updatedClient
        }))
        .then(props.setHelper(null))
        .then(navigate("/"))
        .catch((err) => console.log(err.response))
    }

  return (
    <>
        <table className='table table-borderless table-sm text-start'>
        <thead>
            <tr>
                <th style={width}>
                    <label htmlFor='save' >Manage Project</label>
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