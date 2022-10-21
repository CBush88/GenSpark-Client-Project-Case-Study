import React from 'react'
import { propTypes } from 'react-bootstrap/esm/Image'
import { useNavigate } from 'react-router-dom'

const Project = (props) => {
    const width = {width:"20%"}
    const margin = {marginLeft:"2em"}
    const navigate = useNavigate()

    const onClickDeleteProject = () => {
        props.deleteP(props.project.projectId)
    }

    const onClickUpdateProject = () =>{
        props.setHelper({"client": props.client,
                        "project": props.project})
        navigate("/updateproject")
    }

  return (
    <>
        <td style={width}>
        <button className='btn btn-sm btn-outline-primary' onClick={onClickUpdateProject}>Update</button>
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