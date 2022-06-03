import { useState, useEffect } from "react";
import axios from "axios";
import { ReactSession } from "react-client-session";
import { useNavigate, Link } from "react-router-dom";
import  '../css/studentLogin.css';


import{
  Label,
  Input,
  Button
}
from 'reactstrap'


import  Box  from "@mui/material/Box";
import Typography  from "@mui/material/Typography";



// Images
// import bgImage from "assets/images/hoteLogin.jpg";

function LoginStudent() {
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const navigate = useNavigate();

  let userType = 1;



  function onClickSignIn(e) {
    console.log(userType);
    e.preventDefault();
    if (userType === 1) {
      axios
        .get(`https://rpms-backend.herokuapp.com/students/checkUsername/${username}`)
        .then((res) => {
          if (res.data === true) {

            axios.get(`https://rpms-backend.herokuapp.com/students/getPass/${username}`).then((r) => {
              if (password !== r.data[0].password) {
                console.log(r.data[0].password);
                alert("Check Password!");
              } else {
                ReactSession.set("loginData", r.data[0]);
                navigate("/student-home")
              }
            }).catch((err) => console.log(err));
          }
          else {
            alert("Check Username !");
          }   
          
        }).catch((err) => console.log(err));
    }    
    else if (userType == 2){

    } 
    else {
       
    }   
  }
  return (
    <>
       {/* <Box
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        // sx={{
        //   backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
        //     `${linearGradient(
        //       rgba(gradients.dark.main, 0.6),
        //       rgba(gradients.dark.state, 0.6)
        //     )}, url(${bgImage})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   backgroundRepeat: "no-repeat",
        // }}
      /> 
      <Box px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <Box
                variant="gradient"
                bgColor="info"
                borderRadius="sm"
                coloredShadow="info"
                mx={0}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <Typography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Sign in
                </Typography>
              </Box>
              <Box pt={4} pb={3} px={3}>
                <Box component="form" role="form">
                  <Box mb={2}>
                    <Input
                      type="text"
                      label="Username"
                      fullWidth
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </Box>
                  <Box mb={2}>
                    <Input
                      type="password"
                      label="Password"
                      fullWidth
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </Box>
                  <Box display="flex" alignItems="center" ml={-1}>
                    <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                    <Typography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Remember me
                    </Typography>
                  </Box>
                  <Box mt={4} mb={1}>
                    <Button
                      variant="gradient"
                      color="info"
                      fullWidth
                      onClick={(event) => {
                        onClickSignIn(event);
                      }}
                    >
                      sign in
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box> */}
      <div><div style = {{paddingTop : "50px"}} className = "body">
    <br/><br/> <br/><br/><br/>
    <div className = "FormContainer">
    <form >
    <h3 className = "header" style = {{textAlign : 'center'}}>Student Login</h3>
        <Label for = "Username">Username</Label><br/>
        <Input type = 'text' name = "username" placeholder = "Enter Username" required 
        onChange = {(e) =>{
            setUsername(e.target.value);
        }}
        ></Input><br/>

        <Label for = "Password">Password</Label><br/>
        <Input type = 'password' name = "password" placeholder = "Enter Password" required
        onChange = {(e) =>{
            setPassword(e.target.value);
        }}
        ></Input><br/>

        <Button  onClick={(event) => {  onClickSignIn(event);}} color = "primary" type = "submit" style = {{float:'right' , width : "120px" }}>Login</Button>
        <br/><br/>
        <label>
                Don't have an account?{" "}
                <a href="/register-student">
                  <strong>Create an account</strong>
                </a>
        </label>
    </form>    
    </div>
  </div>   

 </div>
</>
  );
}

export default LoginStudent;