import React from "react";
import { useState , useEffect } from "react";
import { Container ,  Button , Form , Card , CardImg , CardGroup} from 'react-bootstrap';
import axios from 'axios'
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FaUserTie } from "react-icons/fa";
import { RecentActorsOutlined } from "@mui/icons-material";
import { Dropdown , DropdownButton } from "react-bootstrap";
import StudentHeader from "../../Shared/Header-student";
function TopicTitle() {

    const researchAreas = ["Machine Learning" , "Deep Learning" , "Parallel Computing" , "Artificial Intelligence" , "Robotics"];
    const [title , seTitle] = useState("");
    const [supervisors , setSupervisors] = useState([]);
    const [isSelected , setSelected] = useState(false);
    const [supervisorId , setId] = useState("");
    const [field , setField] = useState("Machine Learning");
    const [selection , setSelection] = useState("Research Field");
    const grpId = "RSH_GRP-1";

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
        <div className = 'SupervisorSection' style = {{marginTop : "3.5rem"}}>
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
        
        <Button variant="contained" style={{width : "100%" , marginTop : "4rem"}} onClick = {() =>{
            submitClick();
        }}>Submit</Button>

        </Container>


        </>
    )
}

export default TopicTitle;