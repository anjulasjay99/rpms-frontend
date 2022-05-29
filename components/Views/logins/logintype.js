import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import { ReactSession } from "react-client-session";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Card, CardTitle, Button, CardText, Row, Col } from "reactstrap";

// Material Kit 2 React components





// Images

import { MdOutlinePerson, MdOutlineEngineering ,MdSupervisorAccount } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import "../css/admin.css";

function LoginType() {
  ReactSession.setStoreType("memory");
  const navigate = useNavigate();
  let loginType;

  const adminClick = () => {
    loginType = 3;
    ReactSession.set("loginType", loginType);
    navigate("/login");
  };
  const employeeClick = () => {
    loginType = 2;
    ReactSession.set("loginType", loginType);
    navigate("/login");
  };
  const travellerClick = () => {
    loginType = 1;
    ReactSession.set("loginType", loginType);
    navigate("/login");
  };

  useEffect(() => {}, []);

  return (
    <>
      <center>
      <br/>  <br/>
      <h1 className="text-center font-weight-bold display-1">Login Types</h1>
      </center>
      <Container>
        <Grid py={2} mx={3}>
        </Grid>
      </Container>
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
                  width: "80%",
                }}
              >
                <div className="home-card-div" onClick={() => travellerClick()}>
                  <div>
                    <MdOutlinePerson className="home-card-icon" />
                  </div>
                  <div>
                    <h4>Student</h4>
                  </div>
                </div>

                <div className="home-card-div" onClick={() => employeeClick()}>
                  <div>
                    <MdSupervisorAccount className="home-card-icon" />
                  </div>
                  <div>
                    <h4>Supervisor/Co-Supervisor</h4>
                  </div>
                </div>

                <div className="home-card-div" onClick={() => adminClick()}>
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