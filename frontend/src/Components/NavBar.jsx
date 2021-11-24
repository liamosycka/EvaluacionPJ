import {Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom';
const NavBar = () => {

    return (
        <Nav
            activeKey="/home"
        >
            <Nav.Item>
                <Nav.Link href="/home">Inicio</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/departamentos">Departamentos</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/dependencias">Dependencias</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}
export default NavBar;