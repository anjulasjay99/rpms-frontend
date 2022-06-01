import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import { ReactSession } from "react-client-session";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography  from "@mui/material/Typography";
import {  Row, Col } from "reactstrap";

// Images
import { GiConfirmed } from "react-icons/gi";
import { HiDocumentText,HiOutlineDocumentText } from "react-icons/hi";
import "../css/staffHome.css";
import SupervisorHeader from "../../Shared/Header-Supervisor,Co-supervisor";

function StaffHome() {

  const navigate = useNavigate();
  const AcceptTopicClick = () => {
    navigate("/accepttopic");
  };
  const EvaluateThesisClick = () => {
    navigate("/evaluate-thesis");
  };
  const EvaluateProjectProposalsClick = () => {
    navigate("/login");
  };

  useEffect(() => {}, []);
 

  return (
    
    <>
      <SupervisorHeader/>
        <center>
        <br/>
        <Grid py={2} mx={3}>
        <Typography variant="h2" ml={2} sx = {{
                    fontWeight : "bold"
                }}>
            Staff Home
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
                <div className="home-card-div" onClick={() => AcceptTopicClick()}>
                  <div>
                    <GiConfirmed className="home-card-icon" />
                  </div>
                  <div>
                    <h4>Accept Topics</h4>
                  </div>
                </div>

                <div className="home-card-div" onClick={() => EvaluateThesisClick()}>
                  <div>
                    <HiDocumentText className="home-card-icon" />
                  </div>
                  <div>
                    <h4>Evaluate Thesis</h4>
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

export default StaffHome;