import React, { useState, useEffect, Fragment } from 'react';
import { Card, Button, Row, Col, Form, Container } from 'react-bootstrap'
import { getEdificio, putEdificio, deleteEdificio } from '../Services/Edificio'

const FormModifEdificio = () => {
    const [datosEdificio, setDatosEdificio] = useState({
        id_edif: '',
        nombre: '',
        direccion: '',
    });
    async function getDatosEdificio(id_edif) {
        try {

            const response = await getEdificio(id_edif)
            if (response.data.message == "exito") {
                setDatosEdificio({
                    ...datosEdificio, id_edif: response.data.data.id_edif, nombre: response.data.data.nombre,
                    direccion: response.data.data.direccion
                })

            }
        } catch (e) {
            /*si el ID del edificio insertado no existe, el response llegará vacío, pero si ya se había
            insertado un ID que si existe, los campos de nombre y dirección se habrán completado y cuando
            se cambie el ID a otro que no existe, el setDatosEdificio de arriba no se ejecutará porque
            el mensaje de la response no será exito.
            Es por eso que acá vuelvo a poner en default al estado*/
            console.error(e)
            setDatosEdificio({
                id_edif: '',
                nombre: '',
                direccion: '',
            });
        }
    }

    const handleInputChange = (event) => {
        setDatosEdificio({
            ...datosEdificio,
            [event.target.name]: event.target.value
        });
        if (event.target.name == 'id_edif') {
            getDatosEdificio(event.target.value)
        }
    }

    const enviarModifEdificio = async (event) => {
        event.preventDefault()
        try {
            putEdificio(datosEdificio);
        } catch (e) {
            console.error(e)
        }
    }
    const eliminarEdificio = async () => {
        try {
            deleteEdificio(datosEdificio ? datosEdificio.id_edif : "")
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Fragment>
            <Form id="form_modif_edificio" onSubmit={enviarModifEdificio}>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>Edificios</Card.Header>
                            <Card.Body>
                                <p>ID del Edificio</p>
                                <Form.Group controlId="id_edif">
                                    <input id="id_edif" type="text" placeholder="Ingrese el ID del Edificio"
                                        className="form-control" onChange={handleInputChange} name="id_edif"></input>
                                </Form.Group>
                                <p>Nombre del Edificio</p>
                                <Form.Group controlId="nombre">
                                    <input id="nombre" type="text" value={datosEdificio.nombre ? datosEdificio.nombre : "No hay datos de nombre"}
                                        className="form-control" onChange={handleInputChange} name="nombre"></input>
                                </Form.Group>
                                <p>Dirección del Edificio</p>
                                <Form.Group controlId="direccion">
                                    <input id="direccion" type="text" value={datosEdificio.nombre ? datosEdificio.direccion : "No hay datos de dirección"}
                                        className="form-control" onChange={handleInputChange} name="direccion"></input>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Container>
                            <br></br>
                            <Button type="submit" id="submit_form_modif_edificio">Modificar Edificio</Button>
                        </Container>
                    </Col>
                </Row>

            </Form>
            <Row>

                <Col sm={4}>
                    <Container>
                        <br></br>
                        <Button onClick={() => eliminarEdificio()}>Eliminar edificio</Button>
                    </Container>
                </Col>
            </Row>
        </Fragment>
    )
}
export default FormModifEdificio;