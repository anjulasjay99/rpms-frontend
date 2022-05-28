import React from 'react';
import {useState , useEffect} from 'react';
import { Table , Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function ViewSubstopic(){

    const navigate = useNavigate();
    const [topics , setTopics] = useState([]);
    const id = "RSH_GRP1"
    useEffect(()=>{
        axios.get(`http://localhost:8070/topicReg/getByGroup/${id}`).then((res) =>{
            console.log(res);
            setTopics(res.data);
        }).catch((err) =>{
            console.log(err);
        });
    },[])
        return(
            <>
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

            </>
        )
}

export default ViewSubstopic;