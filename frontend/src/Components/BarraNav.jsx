import { Navbar, Nav, Container } from 'react-bootstrap'
const BarraNav = () => {

    return (
        <Navbar bg="dark" variant="dark">
            <Container fluid>
                <Nav variant="tabs">
                    <Nav.Item>
                        <Nav.Link href="/">Inicio</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/edificios/ver">Ver Edificios</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/dependencias/ver">Ver Dependencias</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/edificios/modif">Modificar Edificios</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/dependencias/modif">Modificar Dependencias</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    )
}
export default BarraNav;