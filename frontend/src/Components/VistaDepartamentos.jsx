import React, { useState, useEffect, Fragment } from 'react'

import 'bootstrap/dist/css/bootstrap.css';
import { Button, Row, Col, Form , Table, Container} from 'react-bootstrap'
import { getDepartamentos } from '../Services/Departamento';
import {getDependenciasDepto} from '../Services/Dependencia'

const getDeptos = async () => {
    console.log("en getdesp")
    const response = await getDepartamentos()
    console.log("response: " + JSON.stringify(response.data))
}

const VistaDepartamentos = () => {
    const [departamentos, setDepartamentos] = useState()
    const [noRender, setNoRender]=useState(true)
    const [arrDependencias, setArrDependencias] = useState()
    useEffect(() => {
        async function getDeptos() {
            const response = await getDepartamentos()
            response ? setDepartamentos((response.data.data)):setDepartamentos()
        }
        getDeptos()
    }, [noRender])

    const handleInputChange = async (event)=>{
        if (event.target.name=="lista_departamentos"){
            const response = await getDependenciasDepto(event.target.value)
            response ? setArrDependencias((response.data.data)):setArrDependencias()
        }
    }
    return (
        <Container>
        <Row>
            <Col sm={6}>
                <Form.Group controlId="lista_departamentos">
                    <Form.Label>Departamentos</Form.Label>
                    <select id="lista_departamentos" class='form-control' onChange={handleInputChange} name="lista_departamentos">
                        <option>***SELECCIONE***</option>
                        {
                                departamentos ?
                                departamentos.map((depto, i) =>
                                (   
                                    <option key={i} value={depto.id_depto}>
                                        {depto.nombre} ({depto.direccion})
                                    </option>
                                )
                                ) : "No hay departamentos"
                                
                        }
                    </select>
                </Form.Group>
           
           
                <Table>
                    <thead>Dependencias del Departamento</thead>
                    <tbody id="tabla_dependencias">
                        {   
                            //aunque siempre cada departamento tiene una dependencia, dejo este if por las dudas
                            arrDependencias?
                            arrDependencias.map((dependencia, i)=>
                            (
                                <tr>
                                    <td>{arrDependencias[i].nombre}</td>
                                    <td>{arrDependencias[i].direccion}</td>
                                </tr>
                            )
                            ):"El departamento no tiene dependencias"
                        }

                    </tbody>
                </Table>
                </Col>
        </Row>
        </Container>
    )
}
export default VistaDepartamentos;