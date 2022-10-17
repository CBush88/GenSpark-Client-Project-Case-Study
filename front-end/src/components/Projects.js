import React, { useState, useEffect } from 'react'
import { getClientById } from '../services/ClientsData'
import AddProject from './AddProject'
import Project from './Project'

const Projects = (props) => {

    const width = {width:"20%"}

    const[projects, setProjects] = useState(props.client.projects)

    const projectsArr = Array.from(projects)

    const [showAddProject, setShowAddProject] = useState(false)

    const onToggle = () => {
        setShowAddProject(!showAddProject)
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
    <button className='btn btn-sm btn-outline-success' onClick={onToggle} >{(showAddProject)?"Cancel" : "Add Project"}</button>
    <AddProject showAddProject={showAddProject} setShowAddProject={setShowAddProject} setClient={props.setClient} client={props.client} clients={props.clients} setClients={props.setClients} retrieveClients={props.retrieveClients} />
    </div>
    </>
  )
}

export default Projects