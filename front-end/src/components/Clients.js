import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Client from './Client';

const Clients = (props) => {

    const clientsArr = Array.from(props.clients)

    useEffect(() => {
        props.retrieveClients();
        props.retrieveProjects();
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
                        Manage Client
                    </th>
                </tr>
            </thead>
            </table>
                {clientsArr.map(client => (
                    <span key={client.clientId}>
                        <Client client={client} setHelper={props.setHelper} clients={props.clients} setClients={props.setClients} />
                    </span>
                ))}
        <br />
        <div className='text-start'>
            <Link to="/addclient"><button className='btn btn-small btn-outline-success'>Add Client</button></Link>
        </div>
    </>
  )
}

export default Clients