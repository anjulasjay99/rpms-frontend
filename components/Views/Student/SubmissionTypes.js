
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import StudentHeader from "../../Shared/Header-student";
import { ReactSession } from "react-client-session";

import { Row , Col } from "react-bootstrap";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


import { BsFillFileEarmarkArrowUpFill } from "react-icons/bs";

import "../css/homeCards.css";

function SubmissionTypes() {
  const navigate = useNavigate();
  const [types , setTypes] = useState([]);

    useEffect(() =>{
        ReactSession.setStoreType("memory");
        student = ReactSession.get("loginData");
        if(student == null){
            navigate('/student-login');
        }
        axios.get("https://rpms-backend.herokuapp.com/submissiontypes/").then((res) =>{
            console.log(res.data);
            setTypes(res.data);
        }).catch((err) =>{
            console.log(err);
        })
    },[])

    function typeClick(type){
        console.log(type);
        navigate('/submissions',{state : type});
    }

  return (
    <>
      <StudentHeader/>
      <Box
        // minHeight="75vh"
        width="100%"
        // sx={{
        //   backgroundImage: `url(${bgImage})`,
        //   backgroundSize: "cover",
        //   backgroundRepeat: "no-repeat",
        //   backgroundPosition: "top",
        //   display: "grid",
        //   placeItems: "center",
        // }}
      />
      <Container>
        <Grid py={2} mx={3}>
          <Typography variant="h3" ml={2} sx = {{
            fontWeight : "bold"
          }}>
            Submissions
          </Typography>
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
               {types.map((type) =>(
                
                <div className="home-card-div" onClick={(() =>{
                    console.log(type);
                    typeClick(type);
                    
                })}>
                    <div>
                    <BsFillFileEarmarkArrowUpFill className="home-card-icon" />
                    </div>
                    <div>
                    <h4>{type.name}</h4>
                    </div>
              </div>                    
               ))} 

{/* 
                <div className="home-card-div" onClick={() => toViewEmployees()}>
                  <div>
                    <MdOutlineGroups className="home-card-icon" />
                  </div>
                  <div>
                    <h4>View Employees</h4>
                  </div>
                </div> */}
              </div>
            </div>
          </Col>
        </Row>
      </Container>

    </>
  );
}

export default SubmissionTypes;
