import React from "react";
import { useState , useEffect } from "react";
import { Container ,  Button , Form , Card , CardImg , CardGroup} from 'react-bootstrap';
import axios from 'axios'
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Dropdown , DropdownButton } from "react-bootstrap";
import StudentHeader from "../../Shared/Header-student";
import { useLocation } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";
import "../css/multicard.css";
function TopicTitle() {
    const location = useLocation();
    const navigate = useNavigate();
    const researchAreas = ["Machine Learning" , "Deep Learning" , "Parallel Computing" , "Artificial Intelligence" , "Robotics"];
    const [title , seTitle] = useState("");
    const [supervisors , setSupervisors] = useState([]);
    const [isSelected , setSelected] = useState(false);
    const [supervisorId , setId] = useState("");
    const [field , setField] = useState("Machine Learning");
    const [selection , setSelection] = useState("Research Field");
  //  const grpId = "RSH_GRP-1";
    const grpId = location.state;
    useEffect(()=>{
        ReactSession.setStoreType("memory");
        student = ReactSession.get("loginData");
        if(student == null){
            navigate('/student-login');
        }
        axios.get(`https://rpms-backend.herokuapp.com/staff/getSupervisors`).then((res) =>{
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
        axios.post(`https://rpms-backend.herokuapp.com/topicReg/add/${grpId}` , newTopicReg).then((res) =>{
            console.log(res);
            alert("Submission Completed!");
            navigate('/student-home');
        }).catch((err) =>{
            console.log(err);
        })
    }

    const handleSelect = (e) =>{
        console.log(e);
        setField(e);
        setSelection(e);
        console.log(field);
        console.log(selection);
    }

    

    return(
        <>
     <StudentHeader/>

        <Container>
        <Typography variant="h3" mb={5}  sx = {{
                    fontWeight : "bold",
                    
                }}>
                    Title Submission
                </Typography> 
        <div className='TopicTitleSection'>
   
        <Form>
                <Form.Group className="mb-3" >
                <Form.Label style = {{fontSize : "1.7rem"}}>Topic</Form.Label> <br />
                <Form.Control type="text" placeholder="Enter the Title" value = {title} onChange = {(e) =>{
                    seTitle(e.target.value)
                }}/>
                </Form.Group>
                <br />
                <Form.Group className="mb-3" >
            <DropdownButton
                    title={selection}
                    id="dropdown-menu-align-right"
                    onSelect={handleSelect}
                        >
                        {researchAreas.map((areas)=>(
                            <Dropdown.Item  eventKey={areas}>{areas}</Dropdown.Item>
                        ))}    
            </DropdownButton>
                </Form.Group>

        </Form>        
        </div>
        </Container>
        <br />
        <hr />
        <Container>
        
        <div className = 'container' style = {{marginTop : "3.5rem"}}>
        {supervisors.map((supervisor) =>(
        <Card style={{ width: '18rem' , borderRadius:'1.5rem' }}>
        <Card.Img variant="top"  />
        <Card.Body>
            <Card.Title>{supervisor.firstName}  {supervisor.lastName}</Card.Title>
            <Card.Text>
                <b>Research Area : </b> {supervisor.field}
                <br/>
                <b>Email : </b>{supervisor.sliitEmail}
                <br/>
                {/* Enter other info */}
            </Card.Text>
            {isSelected && supervisorId == supervisor.staffId ?  <Button variant="contained" color="success" onClick = {() =>{
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
        
        <Button variant="contained" style={{width : "100%" , marginTop : "4rem"}} onClick = {() =>{
            submitClick();
        }}>Submit</Button>

        </Container>


        </>
    )
}

export default TopicTitle;