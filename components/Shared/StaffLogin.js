import styles from '../css/staffl.module.css';
import { useState,useEffect } from 'react';
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
  useEffect(() => {
    ReactSession.setStoreType("memory");
    userType = ReactSession.get("loginType");
    console.log(userType);
    if (userType === null || userType === undefined) {
      navigate("/loginType");
    }
  },[]);
  
  function loginClick(e) {
    console.log(userType);
    e.preventDefault();
    if (userType === 2) {
       axios
        .get(`http://localhost:8070/staff/checkUsername/${username}`)
        .then((res) => {
          console.log(res)
          if (res.data === true) {
            axios.get(`http://localhost:8070/staff/getPass/${username}`).then((r) => {
              console.log(r.data)
              if (password !== r.data[0].password) {
                console.log(r.data[0].password);
                alert("Check Password!");
              } else {
                console.log("staff-login")
                ReactSession.set("loginData", r.data[0]);
                ReactSession.set("staffId",r.data[0].staffId)
                alert("sucess")
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
    <br/><br/> <br/><br/><br/>
    <div className = {styles.FormContainer}>
    <form >
    <h3 className = {styles.header} style = {{textAlign : 'center'}}>Staff Login</h3>
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

        <Button  onClick={(event) => {  loginClick(event);}} color = "primary" type = "submit" style = {{float:'right' , width : "120px" }}>Login</Button>
        <br/><br/>
        <label>
                Don't have an account?{" "}
                <a href="/register-staff">
                  <strong>Create an account</strong>
                </a>
        </label>
    </form>    
    </div>
</div>   </div>
  )
}

export default StaffLogin