import React , { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "../css/homeCards.css";
import { Row , Col } from "react-bootstrap";
import { BsFillFileEarmarkArrowUpFill } from "react-icons/bs";

function StudentHome(){

    const navigate = useNavigate();

    return(
        <>
           <Box
            width="100%"
            />
            <Container>
                <Grid py={2} mx={3}>
                <Typography variant="h3" ml={2}>
                    Student Home
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
                        
                    <div className="home-card-div" onClick={(() =>{
                            navigate('/register-group');
                            
                        })}>
                            <div>
                            <BsFillFileEarmarkArrowUpFill className="home-card-icon" />
                            </div>
                            <div>
                            <h4>Group Registration</h4>
                            </div>
                    </div>  

                    <div className="home-card-div" onClick={(() =>{
                        
                        navigate('/topic');
                            
                        })}>
                            <div>
                            <BsFillFileEarmarkArrowUpFill className="home-card-icon" />
                            </div>
                            <div>
                            <h4>Topic Submission</h4>
                            </div>
                    </div>   

                    <div className="home-card-div" onClick={(() =>{
                            navigate('/submissionTypes');
                            
                        })}>
                            <div>
                            <BsFillFileEarmarkArrowUpFill className="home-card-icon" />
                            </div>
                            <div>
                            <h4>Project Submissions</h4>
                            </div>
                    </div>   

                    <div className="home-card-div" onClick={(() =>{
                            navigate('/ViewSubmissions');
                            
                        })}>
                            <div>
                            <BsFillFileEarmarkArrowUpFill className="home-card-icon" />
                            </div>
                            <div>
                            <h4>Your Submissions</h4>
                            </div>
                    </div>    

               
                    

                    </div>
                    </div>
                </Col>
                </Row>
            </Container>

        </>
    )
}

export default StudentHome;
