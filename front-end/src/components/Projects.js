import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Project from './Project'

const Projects = (props) => {

    const width = {width:"20%"}

    const[projects, setProjects] = useState(props.client.projects)

    const projectsArr = Array.from(projects)

    const navigate = useNavigate()

    const navToAdd = () => {
        props.setClient(props.client)
        navigate("/add-project")
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
            {projectsArr.map(project => (
                <tr key={project.projectId}>
                    <Project project={project} setProjects={setProjects} client={props.client} setClient={props.setClient} clients={props.clients} setClients={props.setClients} />
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