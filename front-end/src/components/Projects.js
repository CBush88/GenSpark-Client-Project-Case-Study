import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Project from './Project'
import PropTypes from  'prop-types'

const Projects = (props) => {

    const {client, setClient, clients, setClients, setHelper, token} = props

    Projects.propTypes = {
        client: PropTypes.object,
        setClient: PropTypes.func,
        clients: PropTypes.array,
        setClients: PropTypes.func,
        setHelper: PropTypes.func,
        token: PropTypes.object,
    }

    const width = {width:"20%"}
    
    const navigate = useNavigate()

    const [projects, setProjects] = useState(client.projects)

    useEffect(() => {
      setProjects(client.projects)
    }, [props.client.projects])
    

    const navToAdd = () => {
        setHelper({"client": props.client})
        navigate("/addproject")
    }

  return (
    <>
    <table className='table table-borderless table-sm text-start'>
        <thead>
            <tr>
                {(token.role === "view")? "" : <th style={width}>
                    Manage Project
                </th>}
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
            {projects.map(project => (
                <tr key={project.projectId}>
                    <Project project={project} projects={projects} setProjects={setProjects} client={client} setClient={setClient} setHelper={setHelper} clients={clients} setClients={setClients} token={token} />
                </tr>
            ))}
        </tbody>
    </table>
    {(token.role === "view")? "" :<div className='text-start'>
    <button className='btn btn-sm btn-outline-success' onClick={navToAdd} >Add Project</button>
    </div>}
    </>
  )
}

export default Projects