import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
const BarraNav = () => {

    return (
        <Navbar bg="dark" variant="dark">
            <Container fluid>
                <Nav variant="tabs">
                    <Nav.Item>
                        <Nav.Link href="/home">Inicio</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/edificios">Edificios</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/dependencias">Dependencias</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    )
}
export default BarraNav;