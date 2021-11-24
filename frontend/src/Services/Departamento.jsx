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

export const getDepartamentos = async () => {
    try {
        const cliente = nuevoCliente();
        const response = await cliente.get('/departamentos/all')
        if (response.status === 200) {
            return response;
        }
    }
    catch (e) {
        console.error(e)
    }
}


