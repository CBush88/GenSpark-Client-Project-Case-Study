import React, { useEffect } from 'react'
import Client from './Client';

const Clients = (props) => {

    const clientsArr = Array.from(props.clients)

    useEffect(() => {
        props.retrieveClients();
    }, []);
    
  return (
    <table className='table table-striped table-sm'>
        <thead>
            <th>
                Client Id
            </th>
            <th>
                Client Name
            </th>
            <th>
                Client Email
            </th>
            <th>
                Projects
            </th>
            <th>
                Signed Agreement
            </th>
        </thead>
        {clientsArr.map(client => (
            <tr key={client.clientId}>
                <Client client={client} />
            </tr>
        ))}
    </table>
  )
}

export default Clients