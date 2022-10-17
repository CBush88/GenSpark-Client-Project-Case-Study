import React, { useState } from 'react'
import { deleteClient } from '../services/ClientsData'
import Projects from './Projects'


const Client = (props) => {
    const width = {width:"20%"}
    const margin = {marginLeft:"2em"}

    const deleteAndRefresh = () => {
        deleteClient(props.client.clientId)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response))
        const updatedClients = props.clients.filter(client => client.clientId !== props.client.clientId)
        props.setClients(updatedClients)
    }

  return (
    <>
        <table className='table table-borderless table-sm text-start'>
            <tbody>
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
                        <button className='btn btn-sm btn-outline-primary'>Update</button>
                        <button className='btn btn-sm btn-outline-danger' style={margin} onClick={deleteAndRefresh}>Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <Projects client={props.client} setClient={props.setClient} clients={props.clients} setClients={props.setClients} retrieveClients={props.retrieveClients} />
        <br />
        <button>Signed Agreement</button>
        <br />
        {props.client.signedAgreement}
        <br />
        <iframe src={props.client.signedAgreement} width="80%" height="50%" />
    </>
  )
}

export default Client