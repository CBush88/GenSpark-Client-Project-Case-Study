import React from 'react'

export const clientValidation = (client) =>{
    let isValidClient = false
    let isValidFile = false
    const isValidEmail=/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(client.clientEmail)
    const isValidName=/\w{3,}/.test(client.clientName)
    if(isValidName){
        if(isValidEmail){
            isValidClient = true
        }else {
            alert("Please enter a proper email address")
        }
    }else {
        alert("Name should be 3+ characters")
    }
    if(client.signedAgreement != null && client.signedAgreement.includes("application/pdf")){
        isValidFile = true
    }else {
        alert("Invalid agreement")
    }
    return (isValidClient && isValidFile)
}

export const projectValidation = (project) =>{
    let isValidProject = false
    const isValidProjectName = /\w{3,}/.test(project.projectName)
    const isValidProjectDescription = /\w{3,}/.test(project.projectDescription)

    if(isValidProjectName){
        if(isValidProjectDescription){
            isValidProject = true
        }else{
            alert("Invalid Project Description")
        }
    }else{
        alert("Invalid project name")
    }
    return isValidProject
}
