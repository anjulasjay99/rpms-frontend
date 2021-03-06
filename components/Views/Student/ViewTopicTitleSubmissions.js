import React from 'react';
import {useState , useEffect} from 'react';
import { Table , Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Row , Col , Container } from 'react-bootstrap';
import StudentHeader from "../../Shared/Header-student";
import { useLocation } from "react-router-dom";
import { ReactSession } from "react-client-session";
function ViewSubstopic(){

    const location = useLocation();
    const navigate = useNavigate();
    const [topics , setTopics] = useState([]);
    const [pSubs1 , setSubs1] = useState([]);
    const [pSubs2 , setSubs2] = useState([]);
   // const id = "RSH1"
    const id = location.state;
    useEffect(()=>{
        ReactSession.setStoreType("memory");
        student = ReactSession.get("loginData");
        if(student == null){
            navigate('/student-login');
        }
        axios.get(`https://rpms-backend.herokuapp.com/topicReg/getByGroup/${id}`).then((res) =>{
            console.log(res);
            setTopics(res.data);
        }).catch((err) =>{
            console.log(err);
        });

        // Get Topic Detail Submissions
        axios.get(`https://rpms-backend.herokuapp.com/submissions/getTDsubmissionByGroup/${id}`).then((res) =>{
            console.log(res);
            setSubs1(res.data);
        }).catch((err) => {
            console.log(err);
        })
     

        // Get All Other Submissions
        axios.get(`https://rpms-backend.herokuapp.com/submissions/getOsubmissionByGroup/${id}`).then((res) =>{
            console.log(res);
            setSubs2(res.data);
        }).catch((err) => {
            console.log(err);
        })
    },[])
        return(
            <>
            <StudentHeader/>
            
            <Row>      
            
            <div className = "titleSubmissions">
                <h2 style={{margin : "3rem 3rem"}}>Topic Submissions to Supervisor</h2>

                <Table striped bordered hover style={{margin : "3rem 3rem"}}>
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
                            <td style = {{textAlign :"center"}}>{topic.isApproved == "Rejected" ? <Button variant = "warning" style = {{width : "11rem"}} onClick = {() => navigate("/topic")}  >Resubmit Topic</Button> : topic.isApproved == "Accepted" ?  <Button variant = "warning" style = {{width : "11rem"}} onClick = {() => navigate('/co-supervisor' , {state : {t : topic.topic , f : topic.field} })}  >Select Co-Supervisor</Button> : <Button variant = "secondary" size = 'sm' style = {{width : "6rem" ,  height : "2rem" , borderRadius : "2rem"}}  >Checking...</Button> } </td>
                            </tr>                            
                        ))}

                    </tbody>
                </Table>        
            </div>
            </Row>  
          
            <hr />
            
            <Row>             
            <div className="titleDocSubmission">

            <h2 style={{margin : "3rem 3rem"}}>Topic Details Document Submission</h2>
            <Table striped bordered hover style={{margin : "3rem 3rem"}}>
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
                        {pSubs1.map((pSub , index) => (
                            <tr>
                            <td>{index + 1}</td>            
                            <td>{pSub.document}</td>
                            <td style = {{textAlign :"center"}}>{pSub.isApproved == "Rejected" ? <Button variant = "danger" size = 'sm' style = {{width : "6rem" ,  height : "2rem" , borderRadius : "2rem"}} >Rejected</Button> : pSub.isApproved == "Accepted" ? <Button variant = "success" size = 'sm' style = {{width : "6rem" ,  height : "2rem" , borderRadius : "2rem"}}  >Accepted</Button> : <Button variant = "secondary" size = 'sm' style = {{width : "6rem" ,  height : "2rem" , borderRadius : "2rem"}}  >Pending</Button> }</td>
                            <td>{pSub.feedback}</td>
                            <td style = {{textAlign :"center"}}>{pSub.isApproved == "Rejected" ? <Button variant = "warning" style = {{width : "11rem"}} onClick = {() => navigate("/topic")}  >Resubmit New Topic</Button> :  pSub.isApproved == "Accepted" ? <Button variant = "warning" style = {{width : "11rem"}} onClick = {() => navigate('co-supervisor')}  >Continue th Project</Button> :  <Button variant = "secondary" style = {{width : "11rem"}} onClick = {() => navigate('co-supervisor')}  >Checking...</Button> }</td>
                            </tr>                            
                        ))}

                    </tbody>
                </Table>    
            </div>
            </Row> 
        
            <hr />
         
            <Row>                
            <div className="projectSubmissions">

            <h2 style={{margin : "3rem 3rem"}}>Project Submissions</h2>
            <Table striped bordered hover style={{margin : "3rem 3rem"}}>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th style = {{textAlign :"center"}}>Document Type</th>
                        <th style = {{textAlign :"center"}}>Document</th>
                        <th style = {{textAlign :"center"}}>Marks/Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pSubs2.map((pSub , index) => (
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
      
            </>
        )
}

export default ViewSubstopic;