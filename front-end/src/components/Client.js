import React, { useState } from 'react'
import { deleteClient } from '../services/ClientsData'
import AllPages from './AllPages'
import Projects from './Projects'



const Client = (props) => {
    const width = {width:"20%"}
    const margin = {marginLeft:"2em"}

    

    const[client, setClient] = useState(props.client)

    const onClickDeleteClient = () => {
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
                        <button className='btn btn-sm btn-outline-danger' style={margin} onClick={onClickDeleteClient}>Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <Projects client={client} setClient={setClient} setHelper={props.setHelper} />
        <br />
        <button>Signed Agreement</button>
        <br />
        <br />
        <AllPages pdf={client.signedAgreement} />
    </>
  )
}

export default Client