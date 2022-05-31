import React , {useState , useEffect} from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import  Button  from "react-bootstrap/Button";
import StudentHeader from "../../Shared/Header-student";
import {  Typography , Grid } from "@mui/material";
import { Row , Col , Container  } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//Toasts for every page
function RegisterStudent() {

    const navigate = useNavigate();
    const [firstName , setfName] = useState("");
    const [lastName , setlName] = useState("");
    const [IdNumber , setIdNumber] = useState("");
    const [email , setEmail] = useState("");
    const[nic , setNic] = useState("");
    const[telNo , setTelNo] = useState("");
    const[password , setPassword] = useState("");
    const[repassword , setRePassword ] = useState("");
    const type = 1;
    function registerClick(e){
        e.preventDefault();

        if(password != repassword){
            setPassword("");
            setRePassword("");

            alert("Password Confirmation Failed!");
            return;
        }
        else{
            const newStudent = {
                firstName,
                lastName,
                IdNumber,
                email,
                nic,
                password,
                telNo
            }
            axios.post("http://localhost:8070/students/add" , newStudent ).then((res) =>{
                console.log(res);
                alert("Added!");

                //Toast
            }).catch((e)=>{
                console.log(e);
                alert("Error!")
            });

            navigate("/login" , {state : type});
        }


    }
    return(
        <>
        <StudentHeader/>
            <Container>
            <Row>
            <Col md = {7}>
             {/* Insert Image */}
            </Col>

            <Col md = {5}>
            
            
            <Grid py={3}>
                <Typography variant="h4" sx = {{
                    fontWeight : "bold"
                }}>
                    Student Registration
                </Typography>
                </Grid>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" value = {firstName} placeholder="Enter First Name" onChange = {(e)=>{
                          setfName(e.target.value);  
                    }} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value = {lastName} placeholder="Enter your Last Name" onChange = {(e)=>{
                        setlName(e.target.value);
                    }} />
                </Form.Group>

                
                <Form.Group className="mb-3">
                    <Form.Label>SLIIT ID Number</Form.Label>
                    <Form.Control type="text" value = {IdNumber} placeholder="Enter your SLIIT ID Number" onChange = {(e) =>{
                        setIdNumber(e.target.value);
                    }} />
                </Form.Group>

                
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value = {email} placeholder="Enter your Email" onChange = {(e) =>{
                        setEmail(e.target.value);
                    }} />

                    <Form.Text className="text-muted">
                    Please Enter your SLIIT email.
                    </Form.Text>
                </Form.Group>

                
                <Form.Group className="mb-3">
                    <Form.Label>NIC</Form.Label>
                    <Form.Control type="text" value = {nic} placeholder="Enter your NIC" onChange = {(e) =>{
                        setNic(e.target.value);
                    }} />
                </Form.Group>

                
                <Form.Group className="mb-3">
                    <Form.Label>Telephone Number</Form.Label>
                    <Form.Control type="number" value = {telNo} placeholder="Enter your Telephone Number" onChange = {(e) =>{
                        setTelNo(e.target.value);
                    }} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value = {password} placeholder="Enter Password" onChange = {(e) =>{
                        setPassword(e.target.value);
                    }} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" value = {repassword} placeholder="Re-enter Password" onChange = {(e) =>{
                        setRePassword(e.target.value);
                    }} />
                </Form.Group>


                <Button variant="primary" style ={{width : "100%" , marginTop : "2rem " , marginBottom : "1rem"}} onClick = {(e)=>{
                    registerClick(e);
                }} type="submit">
                    Register
                </Button>
            </Form>
            </Col>  
            </Row>  
        </Container>         
        </>
    )
}

export default RegisterStudent;

