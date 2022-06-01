import React from "react";
import { BiLogOut } from "react-icons/bi";
import { Navbar , Container , Nav , NavDropdown } from "react-bootstrap";
function StudentHeader(){
    return(
        
            <Navbar sticky = "top" bg="dark" expand="lg" variant = "dark">
                <Container fluid>
                    <Navbar.Brand href="#">Research Project Management</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse   id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px'}}
                        navbarScroll
                    >   
                       
                        <NavDropdown title="Submissions" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Project Submissions</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">My Submissions</NavDropdown.Item>
                       

                        </NavDropdown>
                        <Nav.Link href="#" >
                            Group Registration
                        </Nav.Link>

                        <Nav.Link href="#action1"  ><BiLogOut/></Nav.Link>
                      
                    </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        
    )
}

export default StudentHeader;