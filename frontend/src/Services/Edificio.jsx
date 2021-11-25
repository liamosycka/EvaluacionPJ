import axios from "axios"
import config from './Config/config.json'

//Servicio para consumir las rutas referidas a Dependencias

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
        const response = await cliente.get('/edificios/all');
        if (response.status === 200) {
            return response;
        }
    }
    catch (e) {
        console.error(e)
    }
}

export const getEdificio = async (id_edif) => {
    try {
        const cliente = nuevoCliente();
        const response = await cliente.get('/edificios/' + id_edif + '');
        if (response.status === 200) {
            return response;
        }
    }
    catch (e) {
        console.error(e)
    }
}

export const postEdificio = async (datosEdif) => {
    try {
        const cliente = nuevoCliente();
        const response = await cliente.post('/edificios/nuevo', datosEdif)
        if (response.status === 200) {
            return response;
        }
    } catch (e) {
        console.error(e)
    }
}

export const putEdificio = async (datosEdif) => {
    try {
        const cliente = nuevoCliente();
        const response = await cliente.put('/edificios/modif', datosEdif);
        if (response.status === 200) {
            return response;
        }
    } catch (e) {
        console.error(e)
    }
}

export const deleteEdificio = async (id_edif) => {
    try {
        const cliente = nuevoCliente();
        const response = await cliente.delete('/edificios/delete/' + id_edif + '');
        if (response.status === 200) {
            return response;
        }
    } catch (e) {
        console.error(e)
    }
}


