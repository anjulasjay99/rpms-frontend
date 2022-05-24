import React from 'react';
import {useState , useEffect} from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
function viewSubstopic(){

    const [topics , setTopics] = useState([]);
    const id = 1
    useEffect(()=>{
        axios.get(`http://localhost:8070/topicReg/getByStudent/{id}`).then((res) =>{
            console.log(res);
            setTopics(res);
        }).catch((err) =>{
            console.log(err);
        });
    })
        return(
            <>
                <h2>Topic Submissions to Supervisor</h2>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Topic</th>
                        <th>Status</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topics.map((topic) => (
                            <tr>
                            <td>1</td>
                            <td>{topic.topic}</td>
                            <td>{topic.isApproved}</td>
                            <td>Resubmit Button / CoSupervisor selection</td>
                            </tr>                            
                        ))}

                    </tbody>
                </Table>        

            </>
        )
}

export default viewSubstopic;