
import { useState, useEffect } from "react";
import axios from "axios";
import { ReactSession } from "react-client-session";
import { useNavigate, Link } from "react-router-dom";

import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";


// import Box from "components/Box";
// import Typography from "components/Typography";
// import Input from "components/Input";
// import Button from "components/Button";

import  Box  from "@mui/material/Box";
import Typography  from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Button  from "@mui/material/Button";


// Images
// import bgImage from "assets/images/hoteLogin.jpg";

function LoginStudent() {
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const navigate = useNavigate();

  let userType;

  // useEffect(() => {
  //   ReactSession.setStoreType("memory");
  //   userType = ReactSession.get("loginType");
  //   console.log(userType);
  //   if (userType === null || userType === undefined) {
  //     navigate("/loginType");
  //   }
  // });

  // function onClickSignIn(e) {
  //   console.log(userType);
  //   e.preventDefault();
  //   if (userType === 1) {
  //     axios
  //       .get(`http://localhost:8070/students/checkUsername/${username}`)
  //       .then((res) => {
  //         if (res.data === true) {

  //           axios.get(`http://localhost:8070/students/getPass/${username}`).then((r) => {
  //             if (password !== r.data[0].Password) {
  //               console.log(r.data[0].Password);
  //               alert("Check Password!");
  //             } else {
  //               ReactSession.set("loginData", r.data[0]);

  //               sessionStorage.setItem("username", username);
  //               navigate("/view-rooms");
  //               // Redirect to pages based on role.
  //             }
  //           });
  //         } else {
  //           alert("Check username!");
  //         }
  //       })
  //       .catch((er) => {
  //         console.log(er);
  //       });
  //   } else if (userType === 2) {
  //     axios
  //       .get(`http://localhost:8280/logins/employee/checkusername/${username}`)
  //       .then((res) => {
  //         if (res.data === true) {

  //           axios.get(`http://localhost:8280/logins/employee/info/${username}`).then((r) => {
  //             console.log(r.data.password);
            
  //             console.log(r.data);
  //             if (password !== r.data[0].password) {

  //               alert("Check Password!");
  //             } else {
  //               ReactSession.set("loginData", r.data[0]);
  //               navigate("/employee-home");
  //               // Redirect to pages based on role.
  //             }
  //           });
  //         } else {
  //           alert("Check username!");
  //         }
  //       })
  //       .catch((er) => {
  //         console.log(er);
  //       });
  //   } else {
  //     axios
  //       .get(`http://localhost:8280/logins/admin/getusername/${username}`)
  //       .then((res) => {
  //         if (res.data === true) {
  //           axios.get(`http://localhost:8280/logins/admin/info`).then((r) => {
  //             if (password !== r.data.password) {
  //               alert("Check Password!");
  //             } else {
  //               ReactSession.set("loginData", r.data);
  //               navigate("/admin-home");
  //             }
  //           });
  //         } else {
  //           alert("Check username!");
  //         }
  //       })
  //       .catch((er) => {
  //         console.log(er);
  //       });
  //   }


  //}

  return (
    <>
      <Box
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
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
      </Box>
    </>
  );
}

export default LoginStudent
