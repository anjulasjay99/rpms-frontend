import React from "react";
import { BiLogOut } from "react-icons/bi";
import { Navbar, Container, Nav } from "react-bootstrap";
function PanelHeader() {
    return (

        <Navbar sticky="top" bg="dark" expand="lg" variant="dark">
            <Container fluid>
                <Navbar.Brand href="/panel-home">Research Project Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/evaluate-topic-details" >
                            Topic Details Evaluation
                        </Nav.Link>
                        <Nav.Link href="/evaluate-presentations" >
                            Presentation Evaluation
                        </Nav.Link>

                    </Nav>

                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px', marginLeft: '750px' }}
                        navbarScroll
                    > <Nav.Link href="/" ><BiLogOut />Logout</Nav.Link>

                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default PanelHeader;