import React from 'react'
import Project from './Project'


const Client = (props) => {
    const width = {width:"20%"}
  return (
    <>
        <table className='table table-borderless table-sm text-start'>
            <tr>
        <td style={width}>
            {props.client.clientId}
        </td>
        <td style={width}>
            {props.client.clientName}
        </td>
        <td style={width}>
            {props.client.clientEmail}
        </td>
        <td style={width}>
            <button>Update</button>
            <button>Delete</button>
        </td>
        {/* <td style={width}>
            {props.client.signedAgreement}
        </td> */}
        </tr>
        </table>
        <table className='table table-borderless table-sm text-start'>
            <tr>
                <th style={width}>
                </th>
                <th style={width}>
                    Project Id
                </th>
                <th style={width}>
                    Project Name
                </th>
                <th style={width}>
                    Description
                </th>
            </tr>
        </table>
            {props.client.projects.map(project => (
                <table className='table table-borderless table-sm text-start'>
                    <tr>
                        <td style={width}>
                            <button>Update</button>
                            <button>Delete</button>
                        </td>
                        <Project project={project} />
                    </tr>
                </table>
            ))}
        <button>Signed Agreement</button>
    </>
  )
}

export default Client