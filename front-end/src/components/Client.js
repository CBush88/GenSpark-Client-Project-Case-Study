import React from 'react'

const Client = (props) => {
  return (
    <>
        <td>
            {props.client.clientId}
        </td>
        <td>
            {props.client.clientName}
        </td>
        <td>
            {props.client.clientEmail}
        </td>
        <td>
            {props.client.projects.projectId}
        </td>
        <td>
            {props.client.signedAgreement}
        </td>
    </>
  )
}

export default Client