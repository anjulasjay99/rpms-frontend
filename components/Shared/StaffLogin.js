import styles from '../css/staffl.module.css';
import { useState } from 'react';
import axios from 'axios';
import { ReactSession } from "react-client-session";
import { useHistory } from 'react-router';
import{
    Label,
    Input,
    Button
}
from 'reactstrap'

const StaffLogin = () => {

  const [username , setUsername] = useState();
  const [password , setPassword] = useState();
  
  function submit(e){

  }
  return (
    <div><div style = {{paddingTop : "50px"}} className = {styles.body}>
    <br/><br/><h3 className = {styles.header} style = {{textAlign : 'center'}}>Staff Login</h3><br/><br/>
    <div className = {styles.FormContainer}>
    <form  onSubmit = {submit} encType = "multipart/form-data">

        <Label for = "Username">Username</Label><br/>
        <Input type = 'text' name = "username" placeholder = "Enter Username" required 
        onChange = {(e) =>{
            setUsername(e.target.value);
        }}
        ></Input><br/>

        <Label for = "Password">Password</Label><br/>
        <Input type = 'text' name = "password" placeholder = "Enter Password" required
        onChange = {(e) =>{
            setPassword(e.target.value);
        }}
        ></Input><br/>

        <Button color = "primary" type = "submit" style = {{float:'right' , margin : "5px" }}>Login</Button>
    </form>    
    </div>
</div>   </div>
  )
}

export default StaffLogin