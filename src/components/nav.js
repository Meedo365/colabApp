import React, { useContext } from "react";
import { Store } from "../context/store";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

function Navv() {
    let store = useContext(Store);
    return <>
        <Navbar bg="light" expand="lg">
            {/* <Container> */}
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            {/* </Container> */}
        </Navbar>
        {/* <div className="nav-bar flex">
            <img src={IMG1} alt="" />
            <div className="search">
                <input placeholder="Search Account" id="search" />
                <label for="search">
                    <img src={IMG2} alt="" />
                </label>

            </div>
            <div className="profile flex">
                <img src={IMG3} alt="" />
                <img src={IMG4} alt="" />
            </div>

        </div> */}
    </>
}

export default Navv;