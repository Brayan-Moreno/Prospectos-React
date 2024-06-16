import { api } from 'api/request'

const BASE_URL = '/prospect'

export const prospectsApi = {
    getProspect: async (id) =>{
        return await api({
            method: 'GET',
            endpoint: `${BASE_URL}?idProspect=${id}`,
        })
    },
    getDocuments: async (idProspect) =>{
        return await api({
            method: 'GET',
            endpoint: `${BASE_URL}/documents?idProspect=${idProspect}`
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
    getCtlDocuments: async () =>{
        return await api({
            method: 'GET',
            endpoint: `${BASE_URL}/documents-catalog`
        })
    },
    getCtlStatus: async () =>{
        return await api({
            method: 'GET',
            endpoint: `${BASE_URL}/status-catalog`
        })
    }

}