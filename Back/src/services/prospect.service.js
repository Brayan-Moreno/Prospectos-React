const prospectRepository = require("../repository/prospect.repository")

const getProspect = async (payload) =>{
    const data = await prospectRepository.getProspects(payload)
    return data;
}

const prospectCreate = async (payload) =>{
    const response = {error: true, message: "", data: null}

    const {data, message} = await prospectRepository.createProspect(payload)
    
    response.error = false
    response.message = message

    let files = [...payload.files]
    if(files.length > 0 && data !== 0){
        const result = await prospectRepository.addDocumentsProspect(data, files)
        response.message +=`  y ${result.message}`
    }
    return response;
}

const getDocumentsProspect = async (prospectId) =>{
    const data = await prospectRepository.getDocumentsProspect(prospectId)
    return data;
}

const updateStatus = async (payload) =>{
    const data = await prospectRepository.updateStatus(payload)
    return data;
}

module.exports = {
    getProspect,
    prospectCreate,
    getDocumentsProspect,
    updateStatus,
}