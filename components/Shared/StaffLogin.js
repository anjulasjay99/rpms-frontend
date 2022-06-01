import styles from '../css/staffl.module.css';
import { useState } from 'react';
import axios from 'axios';
import { ReactSession } from "react-client-session";
import { useHistory } from 'react-router';
import { useNavigate, Link } from "react-router-dom";
import{
    Label,
    Input,
    Button
}
from 'reactstrap'

const StaffLogin = () => {

  const [username , setUsername] = useState();
  const [password , setPassword] = useState();
  const navigate = useNavigate();

  let userType = 2;
  
  function loginClick(e) {
    console.log(userType);
    e.preventDefault();
    if (userType === 2) {
      axios
        .get(`http://localhost:8070/staff/checkUsername/${username}`)
        .then((res) => {
          if (res.data === true) {

            axios.get(`http://localhost:8070/staff/getPass/${username}`).then((r) => {
              if (password !== r.data[0].password) {
                console.log(r.data[0].password);
                alert("Check Password!");
              } else {
                ReactSession.set("loginData", r.data[0]);
                navigate("/staff-home")
              }
            }).catch((err) => console.log(err));
          }
          else {
            alert("Check Username !");
          }   
          
        }).catch((err) => console.log(err));
    }    
   
  }
  return (
    <div><div style = {{paddingTop : "50px"}} className = {styles.body}>
    <br/><br/><h3 className = {styles.header} style = {{textAlign : 'center'}}>Staff Login</h3><br/><br/>
    <div className = {styles.FormContainer}>
    <form >

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

        <Button onClick={(event) => {  loginClick(event);}} color = "primary" type = "submit" style = {{float:'right' , margin : "5px" }}>Login</Button>
    </form>    
    </div>
</div>   </div>
  )
}

export default StaffLogin