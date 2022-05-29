import React from "react";
import { useState , useEffect } from "react";
import { Container ,  Button , Form , Card , CardImg , CardGroup} from 'react-bootstrap';
import axios from 'axios'
import { Button } from '@mui/material';
import { FaUserTie } from "react-icons/fa";
import { RecentActorsOutlined } from "@mui/icons-material";
import { Dropdown , DropdownButton } from "react-bootstrap";

function TopicTitle() {

    const researchAreas = ["Machine Learning" , "Deep Learning" , "Parallel Computing" , "Artificial Intelligence" , "Robotics"];
    const [title , seTitle] = useState("");
    const [supervisors , setSupervisors] = useState([]);
    const [isSelected , setSelected] = useState(false);
    const [supervisorId , setId] = useState("");
    const [field , setField] = useState("Machine Learning");
    const grpId = "RSH1";

    useEffect(()=>{
        axios.get(`http://localhost:8070/staff/getSupervisors`).then((res) =>{
            console.log(res.data);
            setSupervisors(res.data);
        }).catch((err) =>{
            console.log(err);
        })
    },[]);


    function submitClick(){
        
        const newTopicReg = {
            field,
            topic : title,
            supervisorId
        }
        axios.post(`http://localhost:8070/topicReg/add/${grpId}` , newTopicReg).then((res) =>{
            console.log(res);
        }).catch((err) =>{
            console.log(err);
        })
    }


    return(
        <>
        <Container>
        <div className='TopicTitleSection'>
        <Form>
                <Form.Group className="mb-3" >
                <Form.Label>Topic</Form.Label>
                <Form.Control type="text" placeholder="Enter the Title" value = {title} onChange = {(e) =>{
                    seTitle(e.target.value)
                }}/>
                </Form.Group>

                <Form.Group className="mb-3" >
                 <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onSelect={(e) =>{
                    setField(e.target.value)
                }}>
                Select Field
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {researchAreas.map((areas) =>(
                    <li><a className="dropdown-item" href="#">{areas}</a></li>
                ))}    
                </ul>
                </div> 
                {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton> */}
                </Form.Group>

        </Form>        
        </div>
        <div className = 'SupervisorSection'>
        {supervisors.map((supervisor) =>(
        <Card style={{ width: '18rem' , borderRadius:'1.5rem' }}>
        <Card.Img variant="top"  />
        <Card.Body>
            <Card.Title>{supervisor.fullName}</Card.Title>
            <Card.Text>
                <b>Research Area : </b> {supervisor.field}
                <br/>
                <b>Email : </b>{supervisor.Sliitemail}
                <br/>
                {/* Enter other info */}
            </Card.Text>
            {isSelected ?  <Button variant="contained" color="success" onClick = {() =>{
                setSelected(false);
                setId("");
            }}>
            Selected
          </Button> : <Button variant="outlined" className = "supervisorSelection" onClick={()=>{
                setSelected(true);
                setId(supervisor.staffId);
            }}>Select Supervisor</Button>  }
        </Card.Body>
        </Card>            
        ))}   

        </div>

        <Button variant="contained" style={{width : "100%"}} onClick = {() =>{
            submitClick();
        }}>Submit</Button>

        </Container>


        </>
    )
}

export default TopicTitle;