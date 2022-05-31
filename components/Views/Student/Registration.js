import React , {useState , useEffect} from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import  Button  from "react-bootstrap/Button";
//Toasts for every page
function RegisterStudent() {

    const [firstName , setfName] = useState("");
    const [lastName , setlName] = useState("");
    const [IdNumber , setIdNumber] = useState("");
    const [email , setEmail] = useState("");
    const[nic , setNic] = useState("");
    const[telNo , setTelNo] = useState("");
    function registerClick(e){
        e.preventDefault();

        const newStudent = {
            firstName,
            lastName,
            IdNumber,
            email,
            nic,
            telNo
        }
        axios.post("http://localhost:8070/students/add" , newStudent ).then((res) =>{
            console.log(res);
            //Toast
        }).catch((e)=>{
            console.log(e);
        });

    }
    return(
        <>
            <Form>
                <Form.Group className="mb-2">
                    <Form.Label>First Names</Form.Label>
                    <Form.Control type="text" value = {firstName} placeholder="Enter First Name" onChange = {(e)=>{
                          setfName(e.target.value);  
                    }} />
                </Form.Group>

                <Form.Group className="mb-2">
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


                <Button variant="primary" onClick = {(e)=>{
                    registerClick(e);
                }} type="submit">
                    Register
                </Button>
            </Form>            
        </>
    )
}

export default RegisterStudent;

