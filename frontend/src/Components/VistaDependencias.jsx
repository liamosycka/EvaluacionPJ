import React, { useState, useEffect, Fragment } from 'react'

import 'bootstrap/dist/css/bootstrap.css';
import { Button, Row, Col, Form, Table, Container } from 'react-bootstrap'
import { getDependencias} from '../Services/Dependencia'


const VistaDependencias = () => {
    const [noRender, setNoRender] = useState(true)
    const [arrDependencias, setArrDependencias] = useState()
    useEffect(() => {
        async function getDepend() {
            const response = await getDependencias();
            response ? setArrDependencias((response.data.data)) : setArrDependencias()
        }
        getDepend()
    }, [noRender])

    return (
        <Container>
            <Row>
                <Col sm={6}>
                <Table striped bordered hover>
                        <thead>Listado de Dependencias
                            <tr>
                                <th>ID Dependencia</th>
                                <th>Nombre</th>
                                <th>Dirección</th>
                                <th>ID Edificio</th>
                            </tr>
                        </thead>
                        <tbody id="tabla_dependencias">
                            {
                                arrDependencias ?
                                    arrDependencias.map((dependencia, i) =>
                                    (
                                        <tr>
                                            <td>{arrDependencias[i].id_dependencia}</td>
                                            <td>{arrDependencias[i].nombre}</td>
                                            <td>{arrDependencias[i].direccion}</td>
                                            <td>{arrDependencias[i].id_edif_fk}</td>
                                        </tr>
                                    )
                                    ) : "El edificio no tiene dependencias"
                            }

                        </tbody>
                    </Table>


                </Col>
                
            </Row>
        </Container>
    )
}
export default VistaDependencias;