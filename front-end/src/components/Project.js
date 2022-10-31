import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteProject } from '../services/ProjectsData'
import PropTypes from 'prop-types'

const Project = (props) => {

    const {projects, setProjects, clients, setClients, client, setClient, setHelper, token} = props

    Project.propTypes = {
        project: PropTypes.object,
        projects: PropTypes.array,
        setProjects: PropTypes.func,
        clients: PropTypes.array,
        setClients: PropTypes.func,
        client: PropTypes.object,
        setClient: PropTypes.func,
        setHelper: PropTypes.func,
        token: PropTypes.object,
    }

    const [project, setProject] = useState(props.project)
    const [updatedClient, setUpdatedClient] = useState(client)

    const {projectId, projectName, projectDescription} = project

    const width = {width:"20%"}
    const margin = {marginLeft:"2em"}
    const navigate = useNavigate()

    const onClickDeleteProject = () => {
        deleteProject(projectId)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.data))

        const updatedProjects = projects.filter((project) => project.projectId !== projectId)
        setProjects(updatedProjects)
        setClient({...client, "projects": updatedProjects})
        setUpdatedClient({...client, "projects": updatedProjects})
        const updatedClients = clients.map(client => {
            if(client.clientId === props.client.clientId){
                return updatedClient
            }else{
                return client
            }
        })
        setClients(updatedClients)
    }

    const onClickUpdateProject = () =>{
        setHelper({
            "client": client,
            "setClient": setClient,
            "project": project,
            "setProject": setProject,
            "setProjects": setProjects
        })
        navigate("/updateproject")
    }

  return (
    <>
        {(token.role === "view")? "" : <td style={width}>
        <button className='btn btn-sm btn-outline-primary' onClick={onClickUpdateProject}>Update</button>
        <button className='btn btn-sm btn-outline-danger' style={margin} onClick={onClickDeleteProject}>Delete</button>
        </td>}
        <td style={width}>
            {project.projectId}
        </td>
        <td style={width}>
            {project.projectName}
        </td>
        <td style={width}>
            {project.projectDescription}
        </td>
    </>
  )
}

export default Project