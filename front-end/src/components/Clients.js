import React, { useEffect } from 'react'
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Client from './Client';

const Clients = (props) => {

    const {clients, setClients, setHelper, retrieveClients} = props

    Clients.propTypes = {
        props: PropTypes.object,
        clients: PropTypes.array,
        setClients: PropTypes.func,
        setHelper: PropTypes.func,
        retrieveClients: PropTypes.func,
    }

    useEffect(() => {
        retrieveClients();
    },[]);

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
                {clients.map(client => (
                    <span key={client.clientId}>
                        <Client client={client} setHelper={setHelper} clients={clients} setClients={setClients} needsRefresh={false} />
                    </span>
                ))}
        <br />
        <div className='text-end' style={{marginRight:"5em"}}>
            <Link to="/addclient"><button className='btn btn-small btn-outline-success'>Add Client</button></Link>
        </div>
    </>
  )
}

export default Clients