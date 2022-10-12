import axios from "axios"

export const getProjects = () => {
  return axios.get(`http://localhost:8080/projects`)
}

export const getProjectById = (id) => {
    return axios.get(`http://localhost:8080/projects/${id}`)
}

export const addProject = (project) => {
    return axios.post(`http://localhost:8080/projects`, project)
}

export const updateProject = (project) => {
    return axios.put(`http://localhost:8080/projects`, project)
}

export const deleteProject = (id) => {
    return axios.delete(`http://localhost:8080/projects/${id}`)
}