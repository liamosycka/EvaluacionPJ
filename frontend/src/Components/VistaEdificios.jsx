import React, { useState, useEffect, Fragment } from 'react'

import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Form, Table, Container } from 'react-bootstrap'
import { getEdificios } from '../Services/Edificio';
import { getDependenciasEdif } from '../Services/Dependencia'


const VistaEdificios = () => {
    const [edificios, setEdificios] = useState()
    const [noRender, setNoRender] = useState(true)
    const [arrDependencias, setArrDependencias] = useState()
    /*con el useEffect (similar a component.didMount) precargo todos los edificios
    de la BD para que el usuario pueda seleccionarlos de la lista.
    Aclaración: Dada mi poca experiencia con React, he tenido que hacer uso de un hook
    llamado "noRender" para que no se me recargue la página constantemente con cada cambio
    de estado de los inputs. Esta solución funciona, tengo que seguir investigando si hay
    una mejor manera de corregirlo.*/

    useEffect(() => {
        async function getEdifs() {
            const response = await getEdificios();
            response ? setEdificios((response.data.data)) : setEdificios()
        }
        getEdifs()
    }, [noRender])

    const handleInputChange = async (event) => {
        let nombreEvento = event.target.name;
        let valorEvento = event.target.value;
        if (nombreEvento == "lista_edificios" && valorEvento != "Seleccione un Edificio") {
            const response = await getDependenciasEdif(valorEvento);
            response ? setArrDependencias((response.data.data)) : setArrDependencias()
        }
    }
    return (
        <Container>
            <Row>
                <Col sm={6}>
                    <Form.Group controlId="lista_edificios">
                        <select id="lista_edificios" class='form-control' onChange={handleInputChange} name="lista_edificios">
                            <option>Seleccione un Edificio</option>
                            {
                                edificios ?
                                    edificios.map((edif, i) =>
                                    (
                                        <option key={i} value={edif.id_edif}>
                                            {edif.nombre} ({edif.direccion})
                                        </option>
                                    )
                                    ) : "No hay edificios"

                            }
                        </select>
                    </Form.Group>


                    <Table striped bordered hover>
                        <thead>Dependencias del edificio
                            <tr>
                                <th>ID Dependencia</th>
                                <th>Nombre</th>
                                <th>Dirección</th>
                                <th>ID Edificio</th>
                            </tr>
                        </thead>
                        <tbody id="tabla_dependencias">
                            {
                                //aunque siempre cada edificio tiene una dependencia, dejo este if por las dudas
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
            <Row>

            </Row>
        </Container>
    )
}
export default VistaEdificios;