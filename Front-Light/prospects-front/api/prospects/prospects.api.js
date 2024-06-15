import { api } from 'api/request'

const BASE_URL = '/prospect'

export const prospectsApi = {
    getProspect: async () =>{
        return await api({
            method: 'GET',
            endpoint: `${BASE_URL}`,
        })
    },
    getDocuments: async (idProspect) =>{
        return await api({
            method: 'GET',
            enpoint: `${BASE_URL}/documents?idProspect=${idProspect}`
        })
    },
    createProspect: async (data) =>{
        return await api({
            method: 'POST',
            endpoint: `${BASE_URL}/create`,
            data
        })
    },
    updateStatus: async (data) =>{
        return await api({
            method: 'PATCH',
            endpoint: `${BASE_URL}/prospect-status`,
            data
        })
    },
    
}