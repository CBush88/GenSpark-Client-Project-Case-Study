import React from 'react'
import { deleteProject } from '../services/ProjectsData'

const Project = (props) => {
    const width = {width:"20%"}
    const margin = {marginLeft:"2em"}

    const deleteAndRefresh = () => {
        deleteProject(props.project.projectId)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response))
        const updatedProjects = props.client.projects.filter(project => project.projectId !== props.project.projectId)
        props.setProjects(updatedProjects)
        props.setClient({
            ...props.client,
            "projects": updatedProjects
        })
    }

  return (
    <>
        <td style={width}>
        <button className='btn btn-sm btn-outline-primary'>Update</button>
        <button className='btn btn-sm btn-outline-danger' style={margin} onClick={deleteAndRefresh}>Delete</button>
        </td>
        <td style={width}>
            {props.project.projectId}
        </td>
        <td style={width}>
            {props.project.projectName}
        </td>
        <td style={width}>
            {props.project.projectDescription}
        </td>
    </>
  )
}

export default Project