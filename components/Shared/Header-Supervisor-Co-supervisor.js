import React from "react";
import { BiLogOut } from "react-icons/bi";
import { Navbar , Container , Nav , NavDropdown } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'
function SupervisorHeader(){
    return(
        
            <Navbar sticky = "top" bg="primary" expand="lg" variant = "dark">
                <Container fluid>
                    <LinkContainer to="/">
                    <Navbar.Brand >Research Project Management</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse   id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px'}}
                        navbarScroll
                    >   
                        <LinkContainer to="/staff-home">
                            <Nav.Link >
                                Staff Home
                             </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/accepttopic">
                            <Nav.Link >
                                Accept Topics
                             </Nav.Link>
                        </LinkContainer>
                       
                        <LinkContainer to="/evaluate-thesis">
                        <Nav.Link href="#" >
                            Evaluate Thesis
                        </Nav.Link>
                        </LinkContainer>

                        <Nav.Link href="#action1"  ><BiLogOut/></Nav.Link>
                      
                    </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        
    )
}

export default SupervisorHeader;