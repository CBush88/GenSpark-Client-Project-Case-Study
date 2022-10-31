import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteClient } from '../services/ClientsData'
import AllPages from './AllPages'
import Projects from './Projects'
import PropTypes from 'prop-types'



const Client = (props) => {

    const {setHelper, clients, setClients, needsRefresh, token} = props

    Client.propTypes = {
        setHelper: PropTypes.func,
        clients: PropTypes.array,
        setClients: PropTypes.func,
        needsRefresh: PropTypes.bool,
        token: PropTypes.object,
    }


    const width = {width:"20%"}
    const margin = {marginLeft:"2em"}

    const [showPDF, setShowPDF] = useState(false)
    const [client, setClient] = useState(props.client)

    const {clientId, clientName, clientEmail, projects, signedAgreement} = client

    useEffect(() => {
        if(needsRefresh){
            setClient(props.client)
        }
    }, [props.client])
    

    const navigate = useNavigate()

    const pdfToggle = () =>(
        setShowPDF(!showPDF)
    )

    const onClickDeleteClient = () => {
        deleteClient(clientId)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response))
        const updatedClients = clients.filter(client => client.clientId !== props.client.clientId)
        setClients(updatedClients)
        setHelper({"client": null})
    }

    const onClickUpdateClient = () => {
        setHelper({"client": client, "setClient": setClient})
        navigate("/updateClient")
    }
  return (
    <>
        <table className='table table-borderless table-sm text-start'>
            <tbody>
                <tr>
                    <td style={width}>
                        {clientId}
                    </td>
                    <td style={width}>
                        {clientName}
                    </td>
                    <td style={width}>
                        {clientEmail}
                    </td>
                    {(token.role === "view")? "" : <td style={width}>
                        <button className='btn btn-sm btn-outline-primary' onClick={onClickUpdateClient}>Update</button>
                        <button className='btn btn-sm btn-outline-danger' style={margin} onClick={onClickDeleteClient}>Delete</button>
                    </td> }
                </tr>
            </tbody>
        </table>
        <Projects client={client} setClient={setClient} clients={clients} setClients={setClients} setHelper={setHelper} token={token} />
        <br />
        <button className={`${signedAgreement == null?"invisible":"btn btn-outline-primary"}`} onClick={pdfToggle}>{(showPDF)?"Close":"Signed Agreement"}</button>
        <br />
        <br />
        {(showPDF)?<AllPages pdf={signedAgreement} />: ""}
    </>
  )
}

export default Client