import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Form, Alert, Toast } from 'react-bootstrap'
import { getEdificio, putEdificio } from '../Services/Edificio'

const FormModifEdificio = (datos) => {
    const [noRender, setNoRender] = useState(true)
    const [datosEdificio, setDatosEdificio] = useState({
        nombre: '',
        direccion: '',
    });
    useEffect(() => {
        async function getDatosEdificio(id_edif) {
            const response = await getEdificio(id_edif)
            console.log("response de edif? "+response.data.data.nombre)
            if (response.message=="exito"){
                setDatosEdificio({...datosEdificio,['nombre']:response.data.data.nombre})
                setDatosEdificio({...datosEdificio,['direccion']:response.data.data.direccion})

            }
        }
        getDatosEdificio(datos['id_edif'])
    }, noRender)
    
    const handleInputChange = (event) => {
        setDatosEdificio({
            ...datosEdificio,
            [event.target.name]: event.target.value
        });
    }

    const enviarModifEdificio = async (event) => {
        event.preventDefault()
        const response=putEdificio(datosEdificio);
    }

    return (
        <Form id="form_modif_edificio" onSubmit={enviarModifEdificio}>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>Edificios</Card.Header>
                        <Card.Body>
                            <Form.Group controlId="nombre">
                                <input id="nombre" type="text" placeholder={datosEdificio?datosEdificio.nombre:""}
                                    className="form-control" onChange={handleInputChange} name="nombre"></input>
                            </Form.Group>
                            <Form.Group controlId="direccion">
                                <input id="direccion" type="text" placeholder={datosEdificio?datosEdificio.direccion:""}
                                    className="form-control" onChange={handleInputChange} name="direccion"></input>
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Button type="submit" id="submit_form_edificio">Crear Edificio</Button>
            </Row>

        </Form>
    )
}
export default FormModifEdificio;