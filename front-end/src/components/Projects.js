import React, { useEffect } from 'react'
import Project from './Project'

const Projects = (props) => {
    const projectsArr = Array.from(props.projects)

    const width = {width:"20%"}

    useEffect(() => {
      props.retrieveProjects()    
    }, [])
    
  return (
    <table className='table table-borderless table-sm'>
        <thead>
            <tr>
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
                    <Project project={project} />
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default Projects