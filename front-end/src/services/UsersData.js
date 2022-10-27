import axios from 'axios'

export const getUsers = () => {
    return axios.get(`http://localhost:8080/users`)
}

export const getUserById = (id) => {
    return axios.get(`http://localhost:8080/users/${id}`)
}

export const addUser = (user) => {
    return axios.post(`http://localhost:8080/users`, user)
}

export const updateUser = (user) => {
    return axios.put(`http://localhost:8080/users`, user)
}

export const deleteUser = (id) => {
    return axios.delete(`http://localhost:8080/users/${id}`)
}