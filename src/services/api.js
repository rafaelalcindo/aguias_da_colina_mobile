import axios from 'axios'
import link from './httpLink'

const api = axios.create({
    baseURL: link
})

export default api;