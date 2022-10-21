import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteProject } from '../services/ProjectsData'
import Project from './Project'

const Projects = (props) => {

    const width = {width:"20%"}
    
    const navigate = useNavigate()

    const navToAdd = () => {
        props.setHelper(props.client)
        navigate("/addproject")
    }

    const[projects, setProjects] = useState(props.client.projects)

    const deleteP = (projectId) => {
        deleteProject(projectId)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response))
        const updatedProjects = projects.filter(project => project.projectId !== projectId)
        setProjects(updatedProjects)
        props.setClient({
            ...props.client,
            "projects": updatedProjects
        })
    }

  return (
    <>
    <table className='table table-borderless table-sm text-start'>
        <thead>
            <tr>
                <th style={width}>
                    Manage Project
                </th>
                <th style={width}>
                    Project Id
                </th>
                <th style={width}>
                    Project Name
                </th>
                <th style={width}>
                    Project Description
                </th>
            </tr>
        </thead>
        <tbody>
            {props.client.projects.map(project => (
                <tr key={project.projectId}>
                    <Project project={project} client={props.client} deleteP={deleteP} setHelper={props.setHelper} />
                </tr>
            ))}
        </tbody>
    </table>
    <div className='text-start'>
    <button className='btn btn-sm btn-outline-success' onClick={navToAdd} >Add Project</button>
    </div>
    </>
  )
}

export default Projects