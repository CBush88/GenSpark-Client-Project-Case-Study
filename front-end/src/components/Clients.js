import React, { useEffect } from 'react'
import Client from './Client';

const Clients = (props) => {

    const clientsArr = Array.from(props.clients)

    useEffect(() => {
        props.retrieveClients();
    }, []);

    const width = {width:"20%"}
    
  return (
    <>
    <h5>Clients</h5>
    <table className='table table-borderless table-sm text-start'>
        <thead>
            <tr>
                <th style={width}>
                    Client Id
                </th>
                <th style={width}>
                    Client Name
                </th>
                <th style={width}>
                    Client Email
                </th>
                <th style={width}>
                    Signed Agreement
                </th>
            </tr>
        </thead>
        </table>
            {clientsArr.map(client => (
                <span key={client.clientId}>
                    <Client client={client} />
                </span>
            ))}
    </>
  )
}

export default Clients