import React from "react";
import { BiLogOut } from "react-icons/bi";
import { Navbar , Container , Nav , NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function StudentHeader(){

    const navigate = useNavigate();
    function logOut(){
        localStorage.clear();
        navigate('/student-login');
    }
    return(
        
            <Navbar sticky = "top" bg="dark" expand="lg" variant = "dark">
                <Container fluid>
                    <Navbar.Brand href="/student-home">Research Project Management</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse   id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px'}}
                        navbarScroll
                    >   
                       
                        <NavDropdown title="Submissions" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="/submissionTypes">Project Submissions</NavDropdown.Item>
                        <NavDropdown.Item href="/ViewSubmissions">My Submissions</NavDropdown.Item>
                       

                        </NavDropdown>
                        <Nav.Link href="/register-group" >
                            Group Registration
                        </Nav.Link>

                        <Nav.Link onClick={() =>{
                            logOut();
                        }}  ><BiLogOut/></Nav.Link>
                      
                    </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        
    )
}

export default StudentHeader;