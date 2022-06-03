import React from "react";
import { useState , useEffect } from "react";
import { Container ,  Button , Form , Card , CardImg , CardGroup} from 'react-bootstrap';
import axios from 'axios'
import { Button } from '@mui/material';
import { FaUserTie } from "react-icons/fa";
import { RecentActorsOutlined } from "@mui/icons-material";
import { Dropdown , DropdownButton } from "react-bootstrap";
import StudentHeader from "../../Shared/Header-student";
import { useLocation } from "react-router-dom";
import { ReactSession } from "react-client-session";
function CoSupervisorSelect() {

    const location = useLocation();
    const [title , seTitle] = useState(location.state.t);
    const [coSupervisors , setCosupervisors] = useState([]);
    const [isSelected , setSelected] = useState(false);
    const [CosupervisorId , setId] = useState("");
    const [field , setField] = useState(location.state.f);

  //  const grpId = "RSH_GRP-3";

    useEffect(()=>{
        ReactSession.setStoreType("memory");
        student = ReactSession.get("loginData");
        if(student == null){
            navigate('/student-login');
        }
        grpId = student.GroupId;
        axios.get(`https://rpms-backend.herokuapp.com/staff/getcoSupervisors`).then((res) =>{
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
        axios.put(`https://rpms-backend.herokuapp.com/topicReg/coSupervisor/${grpId}` , coSupervisor).then((res) =>{
            console.log(res);
        }).catch((err) =>{
            console.log(err);
        })
    }


    return(
        <>
        <StudentHeader/>
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
            <Card.Title>{coSupervisor.firstName}  {coSupervisor.lastName}</Card.Title>
            <Card.Text>
                <b>Research Area : </b> {coSupervisor.field}
                <br/>
                <b>Email : </b>{coSupervisor.sliitEmail}
                <br/>
                {/* Enter other info */}
            </Card.Text>
            {isSelected &&  CosupervisorId == coSupervisor.staffId ?  <Button variant="contained" color="success" onClick = {() =>{
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