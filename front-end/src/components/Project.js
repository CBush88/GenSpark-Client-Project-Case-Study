import React from 'react'

const Project = (props) => {
    const width = {width:"20%"}
  return (
    <>
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