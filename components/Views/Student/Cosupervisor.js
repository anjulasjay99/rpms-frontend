import React from "react";
import { useState , useEffect } from "react";
import { Container ,  Button , Form , Card , CardImg , CardGroup} from 'react-bootstrap';
import axios from 'axios'
import { Button } from '@mui/material';
import { FaUserTie } from "react-icons/fa";
import { RecentActorsOutlined } from "@mui/icons-material";
import { Dropdown , DropdownButton } from "react-bootstrap";

function CoSupervisorSelect() {

    const researchAreas = ["Machine Learning" , "Deep Learning" , "Parallel Computing" , "Artificial Intelligence" , "Robotics"];
    const [title , seTitle] = useState("");
    const [coSupervisors , setCosupervisors] = useState([]);
    const [isSelected , setSelected] = useState(false);
    const [CosupervisorId , setId] = useState("");
    const [field , setField] = useState("Machine Learning");
    const grpId = "RSH1";

    useEffect(()=>{
        axios.get(`http://localhost:8070/staff/getcoSupervisors`).then((res) =>{
            console.log(res.data);
            setCosupervisors(res.data);
        }).catch((err) =>{
            console.log(err);
        })
    },[]);


    function submitClick(){
        
        const coSupervisor = {
            CosupervisorId
        }
        axios.put(`http://localhost:8070/topicReg/coSupervisor/${grpId}` , coSupervisor).then((res) =>{
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
                <Form.Control type="text"  value = {title} disabled/>
                </Form.Group>

                <Form.Group className="mb-3" >
                <Form.Label>Field</Form.Label>
                <Form.Control type="text"  value = {field} disabled/>
                </Form.Group>

        </Form>        
        </div>
        <div className = 'SupervisorSection'>
        {coSupervisors.map((coSupervisor) =>(
        <Card style={{ width: '18rem' , borderRadius:'1.5rem' }}>
        <Card.Img variant="top"  />
        <Card.Body>
            <Card.Title>{coSupervisor.fullName}</Card.Title>
            <Card.Text>
                <b>Research Area : </b> {coSupervisor.field}
                <br/>
                <b>Email : </b>{coSupervisor.Sliitemail}
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
                setId(coSupervisor.staffId);
            }}>Select Co-supervisor</Button>  }
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

export default CoSupervisorSelect;