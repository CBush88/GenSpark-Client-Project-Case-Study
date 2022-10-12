import axios from 'axios'

export const getClients = () => {
    return axios.get(`http://localhost:8080/clients`)
}

export const getClientById = (id) => {
    return axios.get(`http://localhost:8080/clients/${id}`)
}

export const addClient = (client) => {
    return axios.post(`http://localhost:8080/clients`, client)
}

export const updateClient = (client) => {
    return axios.put(`http://localhost:8080/clients`, client)
}

export const deleteClient = (id) => {
    return axios.delete(`http://localhost:8080/clients/${id}`)
}