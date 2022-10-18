import React from 'react'

const Project = (props) => {
    const width = {width:"20%"}
    const margin = {marginLeft:"2em"}

    const onClickDeleteProject = () => {
        props.deleteP(props.project.projectId)
    }

  return (
    <>
        <td style={width}>
        <button className='btn btn-sm btn-outline-primary'>Update</button>
        <button className='btn btn-sm btn-outline-danger' style={margin} onClick={onClickDeleteProject}>Delete</button>
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