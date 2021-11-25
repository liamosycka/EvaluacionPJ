import React, { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Table, Container } from 'react-bootstrap'
import { getDependencias } from '../Services/Dependencia'


const VistaDependencias = () => {
    const [noRender, setNoRender] = useState(true)
    const [arrDependencias, setArrDependencias] = useState()
    useEffect(() => {
        async function getDepend() {
            try {
                const response = await getDependencias();
                response ? setArrDependencias((response.data.data)) : setArrDependencias()
            } catch (e) {
                console.error(e)
            }

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
                                    ) : "No hay Dependencias"
                            }

                        </tbody>
                    </Table>


                </Col>

            </Row>
        </Container>
    )
}
export default VistaDependencias;