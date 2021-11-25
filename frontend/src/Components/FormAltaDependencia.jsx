import React, { useState, useEffect} from 'react';
import {Card, Button, Row, Col, Form} from 'react-bootstrap'
import {postDependencia} from '../Services/Dependencia'

const FormAltaDependencia = ()=>{
    const [datosDependencia, setDatosDependencia]=useState({
        nombre: '',
        direccion: '',
        edificio: '',
    })

    const handleInputChange=(event)=>{
        setDatosDependencia({
            ...datosDependencia,
            [event.target.name]:event.target.value
        })
    }

    const enviarDatosDependencia = async (event)=>{
        postDependencia(datosDependencia)
    }

    return(
        <Form id="form_alta_dependencia" onSubmit={enviarDatosDependencia}>
            <Row>
                <Col>
                <Card>
                    <Card.Header>Dependencias</Card.Header>
                    <Card.Body>
                        <Form.Group controlId="nombre">
                            <input id="nombre" type="text" placeholder="Nombre de la dependencia"
                            className="form-control" onChange={handleInputChange} name="nombre"></input>
                        </Form.Group>
                        <Form.Group controlId="direccion">
                            <input id="direccion" type="text" placeholder="Dirección de la dependencia"
                            className="form-control" onChange={handleInputChange} name="direccion"></input>
                        </Form.Group>
                        <Form.Group controlId="edificio">
                            <input id="edificio" type="text" placeholder="Edificio del que depende (su ID)"
                            className="form-control" onChange={handleInputChange} name="edificio"></input>
                        </Form.Group>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            <Row>
                <Button type="submit" id="submit_form_dependencia">Crear dependencia</Button>
            </Row>
        </Form>
    )
}
export default FormAltaDependencia;