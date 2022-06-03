import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import { ReactSession } from "react-client-session";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography  from "@mui/material/Typography";
import { Card, CardTitle, Button, CardText, Row, Col } from "reactstrap";

// Images
import { MdOutlinePerson, MdOutlineEngineering ,MdSupervisorAccount } from "react-icons/md";
import "../css/admin.css";

function LoginType() {
  ReactSession.setStoreType("memory");
  const navigate = useNavigate();
  let loginType;

  const panaelMemberClick = () => {
    loginType = 3;
    ReactSession.set("loginType", loginType);
    navigate("/panel-login");
  };
  const supervisorClick = () => {
    loginType = 2;
    ReactSession.set("loginType", loginType);
    navigate("/staff-login");
  };
  const StudentClick = () => {
    loginType = 1;
    ReactSession.set("loginType", loginType);
    navigate("/student-login");
  };

  useEffect(() => {}, []);

  return (
    <>
        <center>
        <br/>
        <Grid py={2} mx={3}>
        <Typography variant="h2" ml={2} sx = {{
                    fontWeight : "bold"
                }}>
            Logins
          </Typography>
        </Grid>
        </center>
              <Container>
        <Row>
          <Col>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div className="home-card-div" onClick={() => StudentClick()}>
                  <div>
                    <MdOutlinePerson className="home-card-icon" />
                  </div>
                  <div>
                    <h4>Student</h4>
                  </div>
                </div>

                <div className="home-card-div" onClick={() => supervisorClick()}>
                  <div>
                    <MdSupervisorAccount className="home-card-icon" />
                  </div>
                  <div>
                    <h4>Supervisor/Co-Supervisor</h4>
                  </div>
                </div>

                <div className="home-card-div" onClick={() => panaelMemberClick()}>
                  <div>
                    <MdOutlineEngineering className="home-card-icon" />
                  </div>
                  <div>
                    <h4>Panel Member</h4>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
     
    </>
  );
}

export default LoginType;