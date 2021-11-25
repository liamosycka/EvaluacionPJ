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

export const getDependencia = async (id_dependencia) => {
    try {
        const cliente = nuevoCliente();
        const response = await cliente.get('/edificios/dependencias/' + id_dependencia + '');
        if (response.status === 200) {
            return response;
        }
    }
    catch (e) {
        console.error(e)
    }
}

export const getDependenciasEdif = async (id_edif) => {
    try {
        const cliente = nuevoCliente();
        const response = await cliente.get('/edificios/dependencias/edif/' + id_edif + '/');
        if (response.status === 200) {
            return response;
        }
    } catch (e) {
        console.error(e)
    }
}

export const getDependencias = async () => {
    try {
        const cliente = nuevoCliente();
        const response = await cliente.get('/edificios/dependencias/all');
        if (response.status === 200) {
            return response;
        }
    } catch (e) {
        console.error(e)
    }
}

export const postDependencia = async (datosDependencia) => {
    try {
        const cliente = nuevoCliente();
        const response = await cliente.post('/edificios/dependencias/nueva', datosDependencia);
        if (response.status === 200) {
            return response;
        }
    } catch (e) {
        console.error(e)
    }
}

export const putDependencia = async (datosDependencia) => {
    try {
        const cliente = nuevoCliente();
        const response = await cliente.put('/edificios/dependencias/modif', datosDependencia);
        if (response.status === 200) {
            return response;
        }
    } catch (e) {
        console.error(e)
    }
}

export const deleteDependencia = async (id_dependencia) => {
    try {
        const cliente = nuevoCliente();
        const response = await cliente.delete('/edificios/dependencias/delete/' + id_dependencia + '');
        if (response.status === 200) {
            return response;
        }
    } catch (e) {
        console.error(e)
    }
}