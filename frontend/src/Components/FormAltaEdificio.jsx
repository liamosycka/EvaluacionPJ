import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Form, Alert, Toast } from 'react-bootstrap'
import { postEdificio } from '../Services/Edificio'

const FormAltaEdificio = () => {
    const [datosEdificio, setDatosEdificio] = useState({
        nombre: '',
        direccion: '',
    });

    const handleInputChange = (event) => {
        setDatosEdificio({
            ...datosEdificio,
            [event.target.name]: event.target.value
        });
    }

    const enviarDatosEdificio = async (event) => {
        const response=postEdificio(datosEdificio);
    }

    return (
        <Form id="form_alta_edificio" onSubmit={enviarDatosEdificio}>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>Edificios</Card.Header>
                        <Card.Body>
                            <Form.Group controlId="nombre">
                                <input id="nombre" type="text" placeholder="Nombre del Edificio"
                                    className="form-control" onChange={handleInputChange} name="nombre"></input>
                            </Form.Group>
                            <Form.Group controlId="direccion">
                                <input id="direccion" type="text" placeholder="Dirección del Edificio"
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
export default FormAltaEdificio;