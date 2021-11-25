import React, { useState, Fragment } from 'react';
import { Card, Button, Row, Col, Form, Container } from 'react-bootstrap'
import { getDependencia, putDependencia, deleteDependencia } from '../Services/Dependencia'

const FormModifdependencia = () => {
    const [datosDependencia, setDatosDependencia] = useState({
        id_dependencia: '',
        nombre: '',
        direccion: '',
        id_edif_fk: '',
    });
    async function getDatosDependencia(id_edif) {
        try {

            const response = await getDependencia(id_edif)
            if (response.data.message == "exito") {
                setDatosDependencia({
                    ...datosDependencia, id_dependencia: response.data.data.id_dependencia, nombre: response.data.data.nombre,
                    direccion: response.data.data.direccion, id_edif_fk: response.data.data.id_edif_fk
                })

            }
        } catch (e) {

            console.error(e)
            setDatosDependencia({
                id_dependencia: '',
                nombre: '',
                direccion: '',
                id_edif_fk: '',
            });
        }
    }

    const handleInputChange = (event) => {
        setDatosDependencia({
            ...datosDependencia,
            [event.target.name]: event.target.value
        });
        if (event.target.name == 'id_dependencia') {
            getDatosDependencia(event.target.value)
        }
    }

    const enviarModifDependencia = async (event) => {
        event.preventDefault()
        try {
            putDependencia(datosDependencia);
        } catch (e) {
            console.error(e)
        }
    }
    const eliminarDependencia = async () => {
        try {
            deleteDependencia(datosDependencia ? datosDependencia.id_dependencia : "")
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Fragment>
            <Form id="form_modif_dependencia" onSubmit={enviarModifDependencia}>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>Dependencias</Card.Header>
                            <Card.Body>
                                <Form.Group controlId="id_dependencia">
                                    <p>ID de la Dependencia</p>
                                    <input id="id_edif" type="text" placeholder="Ingrese el ID de la dependencia"
                                        className="form-control" onChange={handleInputChange} name="id_dependencia"></input>
                                </Form.Group>
                                <Form.Group controlId="nombre">
                                    <p>Nombre de Dependencia</p>
                                    <input id="nombre" type="text" value={datosDependencia.nombre ? datosDependencia.nombre : "No hay datos de nombre"}
                                        className="form-control" onChange={handleInputChange} name="nombre"></input>
                                </Form.Group>
                                <Form.Group controlId="direccion">
                                    <p>Dirección de Dependencia</p>
                                    <input id="direccion" type="text" value={datosDependencia.direccion ? datosDependencia.direccion : "No hay datos de dirección"}
                                        className="form-control" onChange={handleInputChange} name="direccion"></input>
                                </Form.Group>
                                <Form.Group controlId="id_edif_fk">
                                    <p>ID del Edificio</p>
                                    <input id="id_edif_fk" type="text" value={datosDependencia.id_edif_fk ? datosDependencia.id_edif_fk : "No hay datos de ID de Edificio"}
                                        className="form-control" onChange={handleInputChange} name="id_edif_fk"></input>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Container>
                            <br></br>
                            <Button type="submit" id="submit_form_modif_dependencia">Modificar dependencia</Button>
                        </Container>
                    </Col>
                </Row>

            </Form>
            <Row>
                <Col sm={4}>
                    <Container>
                        <br></br>
                        <Button onClick={() => eliminarDependencia()}>Eliminar dependencia</Button>
                    </Container>
                </Col>
            </Row>
        </Fragment>
    )
}
export default FormModifdependencia;