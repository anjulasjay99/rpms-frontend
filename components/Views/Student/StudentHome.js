import React , { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "../css/homeCards.css";
import { Row , Col } from "react-bootstrap";
import { BsFillFileEarmarkArrowUpFill } from "react-icons/bs";
import StudentHeader from "../../Shared/Header-student";
import { ReactSession } from "react-client-session";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdTopic } from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";

function StudentHome(){
    var grpId;
    const navigate = useNavigate();
    useEffect(() =>{
        ReactSession.setStoreType("memory");
        student = ReactSession.get("loginData");
        if(student == null){
            navigate('/student-login');
        }
        else if(student.isGrouped == false){
            navigate('/register-group');
        }
        grpId = student.GroupId;
    },[]);
    return(
        <>
        <StudentHeader/>
           <Box
            width="100%"
            />
            <Container>
                <Grid py={2} mx={3}>
                <Typography variant="h3" ml={2} sx = {{
                    fontWeight : "bold"
                }}>
                    Student Home
                </Typography>
                </Grid>
            </Container>
            <Container>
                <Row>
                <Col aria-hidden>

                        
                    <div className="home-card-div" onClick={(() =>{
                            navigate('/register-group');
                            
                        })}>
                            <div>
                            <AiOutlineUsergroupAdd className="home-card-icon" />
                            </div>
                            <div>
                            <h4>Group Registration</h4>
                            </div>
                    </div>  
                </Col>      
                <Col>
                    <div className="home-card-div" onClick={(() =>{
                        
                        navigate('/topic' , {state : grpId});
                            
                        })}>
                            <div>
                            <CgFileDocument className="home-card-icon" />
                            </div>
                            <div>
                            <h4>Topic Submission</h4>
                            </div>
                    </div>   
                </Col>      
                </Row>
                <Row>
                    <Col>
                        <div className="home-card-div" onClick={(() =>{
                                navigate('/submissionTypes' , {state : grpId});
                                
                            })}>
                        <div>
                            <BsFillFileEarmarkArrowUpFill className="home-card-icon" />
                        </div>
                        <div>
                            <h4>Project Submissions</h4>
                        </div>
                        </div>   
                    </Col>
                    <Col>
                    <div className="home-card-div" onClick={(() =>{
                            navigate('/ViewSubmissions' , {state : grpId});
                            
                        })}>
                    <div>
                        <MdTopic className="home-card-icon" />
                    </div>
                    <div>
                        <h4>Your Submissions</h4>
                    </div>
                    </div>    
                    </Col>                                  
                </Row>
            </Container>

        </>
    )
}

export default StudentHome;
