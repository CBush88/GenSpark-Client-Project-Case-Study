import React, { useEffect } from 'react'
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Client from './Client';

const Clients = (props) => {

    const {clients, setClients, setHelper, retrieveClients, token} = props

    Clients.propTypes = {
        props: PropTypes.object,
        clients: PropTypes.array,
        setClients: PropTypes.func,
        setHelper: PropTypes.func,
        retrieveClients: PropTypes.func,
        token: PropTypes.object,
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
                    {(token.role === "view")? "" : <th style={width}>
                        Manage Client
                    </th>}
                </tr>
            </thead>
            </table>
                {clients.map(client => (
                    <span key={client.clientId}>
                        <Client client={client} setHelper={setHelper} clients={clients} setClients={setClients} needsRefresh={false} token={token} />
                    </span>
                ))}
        <br />
        {(token.role === "view")? "" :<div className='text-end' style={{marginRight:"5em"}}>
            <Link to="/addclient"><button className='btn btn-small btn-outline-success'>Add Client</button></Link>
        </div>}
    </>
  )
}

export default Clients