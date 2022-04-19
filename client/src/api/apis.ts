import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:5000'})

export const getNamesAPI = () => API.get('/api/names')


export const getReceiverMessagesAPI = (userName: string) => API.get(`/api/message/${userName}`)
export const getSendedMessagesAPI = (userName: string) => API.get(`/api/message/sended/${userName}`)
export const createMessageAPI = (messageData: any) => API.post(`/api/message/`, messageData)
// /api/message/sended/:nameOfSender