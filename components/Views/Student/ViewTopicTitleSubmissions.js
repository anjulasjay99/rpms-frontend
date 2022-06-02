import React from 'react';
import {useState , useEffect} from 'react';
import { Table , Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Row , Col , Container } from 'react-bootstrap';
import StudentHeader from "../../Shared/Header-student";
function ViewSubstopic(){

    const navigate = useNavigate();
    const [topics , setTopics] = useState([]);
    const [pSubs , setSubs] = useState([]);
    const id = "RSH1"
    let t = "Topic Details Document"
    useEffect(()=>{
        axios.get(`http://localhost:8070/topicReg/getByGroup/${id}`).then((res) =>{
            console.log(res);
            setTopics(res.data);
        }).catch((err) =>{
            console.log(err);
        });

        axios.get(`http://localhost:8070/submissions/getsubmissionByGroup/${id}`).then((res) =>{
            console.log(res);
            setSubs(res.data);
        }).catch((err) => {
            console.log(err);
        })

    },[])
        return(
            <>
            <StudentHeader/>
            <Container>
            <Row>      
            
            <div className = "titleSubmissions">
                <h2>Topic Submissions to Supervisor</h2>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th style = {{textAlign :"center"}}>Topic</th>
                        <th style = {{textAlign :"center"}}>Status</th>
                        <th style = {{textAlign :"center"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topics.map((topic , index) => (
                            <tr>
                            <td>{index + 1}</td>
                            <td>{topic.topic}</td>
                            <td style = {{textAlign :"center"}}>{topic.isApproved == "Rejected" ? <Button variant = "danger" size = 'sm' style = {{width : "6rem" ,  height : "2rem" , borderRadius : "2rem"}} >Rejected</Button> : topic.isApproved == "Accepted" ? <Button variant = "success" size = 'sm' style = {{width : "6rem" ,  height : "2rem" , borderRadius : "2rem"}}  >Accepted</Button> : <Button variant = "secondary" size = 'sm' style = {{width : "6rem" ,  height : "2rem" , borderRadius : "2rem"}}  >Pending</Button> }</td>
                            <td style = {{textAlign :"center"}}>{topic.isApproved == "Rejected" ? <Button variant = "warning" style = {{width : "11rem"}} onClick = {() => navigate("/topic")}  >Resubmit Topic</Button> : <Button variant = "warning" style = {{width : "11rem"}} onClick = {() => navigate('co-supervisor')}  >Select Co-Supervisor</Button>}</td>
                            </tr>                            
                        ))}

                    </tbody>
                </Table>        
            </div>
            </Row>  
            </Container>
            <hr />
            <Container>
            <Row>             
            <div className="titleDocSubmission">

            <h2>Topic Details Document Submission</h2>
            <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th style = {{textAlign :"center"}}>Document</th>
                        <th style = {{textAlign :"center"}}>Status</th>
                        <th style = {{textAlign :"center"}}>Feedback</th>
                        <th style = {{textAlign :"center"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pSubs.filter((val) =>{
                            if(val.submissionType.toLowerCase().includes(t.toLowerCase())){
                                return val;
                            }
                            else
                            return val;
                        }).map((pSub , index) => (
                            <tr>
                            <td>{index + 1}</td>            
                            <td>{pSub.document}</td>
                            <td style = {{textAlign :"center"}}>{pSub.isApproved == "Rejected" ? <Button variant = "danger" size = 'sm' style = {{width : "6rem" ,  height : "2rem" , borderRadius : "2rem"}} >Rejected</Button> : pSub.isApproved == "Accepted" ? <Button variant = "success" size = 'sm' style = {{width : "6rem" ,  height : "2rem" , borderRadius : "2rem"}}  >Accepted</Button> : <Button variant = "secondary" size = 'sm' style = {{width : "6rem" ,  height : "2rem" , borderRadius : "2rem"}}  >Pending</Button> }</td>
                            <td>Feedback</td>
                            <td style = {{textAlign :"center"}}>{pSub.isApproved == "Rejected" ? <Button variant = "warning" style = {{width : "11rem"}} onClick = {() => navigate("/topic")}  >Resubmit New Topic</Button> : <Button variant = "warning" style = {{width : "11rem"}} onClick = {() => navigate('co-supervisor')}  >Continue th Project</Button>}</td>
                            </tr>                            
                        ))}

                    </tbody>
                </Table>    
            </div>
            </Row> 
            </Container>
            <hr />
            <Container>
            <Row>                
            <div className="projectSubmissions">

            <h2>Project Submissions</h2>
            <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th style = {{textAlign :"center"}}>Document Type</th>
                        <th style = {{textAlign :"center"}}>Document</th>
                        <th style = {{textAlign :"center"}}>Marks/Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pSubs.filter((val) =>{

                            if(!val.submissionType.toLowerCase().includes(t.toLowerCase())){
                                return val;
                            }
                            else
                                return val;
                        }).map((pSub , index) => (
                            <tr>
                            <td>{index + 1}</td>                
                            <td>{pSub.submissionType}</td>
                            <td>{pSub.document}</td>
                            <td>{pSub.marks}</td>
                            </tr>                            
                        ))}

                    </tbody>
             </Table>    
               
            </div>
            </Row> 
            </Container>
            </>
        )
}

export default ViewSubstopic;