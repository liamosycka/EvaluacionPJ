import axios from "axios"
import config from './Config/config.json'

const nuevoCliente = () => {
    return axios.create({
        baseURL: config.baseURL,
        timeout: config.timeout,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

export const getEdificios = async () => {
    try {
        const cliente = nuevoCliente();
        const response = await cliente.get('/edificios/all')
        if (response.status === 200) {
            return response;
        }
    }
    catch (e) {
        console.error(e)
    }
}


