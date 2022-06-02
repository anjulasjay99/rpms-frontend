import React,{useEffect,useState} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Container ,  Button} from 'react-bootstrap';
import { FaFileDownload } from "react-icons/fa";
import { Row, Col, Card, Container, Button,FormGroup,Label,Input,Form } from "reactstrap";
import { Schema, SpatialAudioOffTwoTone } from '@mui/icons-material';
import ReactDOM from 'react-dom';
import "../css/evaluatethesis.css"
import axios from "axios";
import SupervisorHeader from "../../Shared/Header-Supervisor,Co-supervisor";

const EvalauteThesis = () => {
  const navigate = useNavigate()
  const [markingSchemes, setmarkingSchemes] = useState([]);
  const [GroupId, setGroupId] = useState("");
  const [doc, setdoc] = useState("");
  const [marks,setmarks] = useState(null);
  const [docfileId,setdocfileId] = useState(""); 
  const [submissionDate, setsubmissionDate] = useState("");
  const [submissionType, setsubmissionType] = useState("");
  const [staff, setstaff] = useState([]);
  const [Description, setdescription] = useState([]);
  
  const { id } = useParams();
  console.log(id)
  
  //download marking schema
  const openFile = (schema) => {
    console.log(schema)
    fetch(
      `https://rpms-backend.herokuapp.com/markingschemes/files/download/${schema.fileId}`
    )
      .then((response) => response.blob())
      .then((blob) => {
        const link =  document.createElement("a");
        console.log(link)
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", schema.document);
        link.setAttribute("target", "_blank");
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };


 //download student submissions
  const openDoc = (docfileId) => {
    fetch(
      `http://localhost:8070/submissions/files/download/${docfileId}`
    )
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", doc);
        link.setAttribute("target", "_blank");
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //fetch all marking schemas
  useEffect(() => {
    async function fetchData() {
      await fetch("https://rpms-backend.herokuapp.com/markingschemes/")
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          setmarkingSchemes(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchData();
  }, []);

  //get submission by ID
  useEffect(() => {
    axios
      .get(`http://localhost:8070/submissions/getsubmission/${id}`)
      .then((res) => {
        console.log(res.data);
        setGroupId(res.data.GroupId);
        setdoc(res.data.document);
        setsubmissionDate(res.data.submissionDate);
        setsubmissionType(res.data.submissionType)
        setdocfileId(res.data.docfileId)
        console.log(doc)
        console.log(docfileId)
        if(res.data.marks !=0){
        setmarks(res.data.marks)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //fetch staff
  useEffect(() => {
    axios
      .get(`http://localhost:8070/staff/getAll`)
      .then((res) => {
          setstaff(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //submit data
  function submit(e) {

    if(marks ==null || marks == 0){
      alert("please enter marks")
    }
    else if(marks < 0){
      alert("Please enter valid marks")
    }
    else{
    const newupdateddata = {
      GroupId,
      submissionDate,
      submissionType,
      marks,
      doc,
      docfileId
    };
    console.log(newupdateddata)
    axios
      .put(`http://localhost:8070/submissions/update/${id}`, newupdateddata)
      .then((res) => {
          res.json
      })
      .catch((err) => {
        console.log(err);
      });
      alert("Successfully evaluated")
    }
  }

  //request reviewer
  function requestReviewer(e){
    e.preventDefault();
    const newreview ={
      GroupId,
      Description
    }
    console.log(newreview)
    axios
      .post("http://localhost:8070/reviewer/save", newreview)
      .then((res) => {
        console.log(res)
        alert("Reviewer Added");
      })
      .catch((err) => {
        alert(err);
      });
  }



  return (
    <div> 
    <SupervisorHeader/>
    <br/>
    <Container>
    <h2>Download Marking Schema</h2>
    <br/>
    {/* <Input type="select" name="select" id="exampleSelect" value={doc} onChange = {(e) =>{
                    setdoc(e.target.value);
                  }}   >     */}
    {markingSchemes.map((schema)=>{
    return(
     <ul >
     <li style={{listStyleType: "circle"}}> <a href="#" onClick={() => openFile(schema)}>
     {schema.document}
     </a></li>
     </ul>                      
    )
    })}  
    <br/>
    </Container>
    <Container>
    <Form>
    <h2>Request Reviewer</h2>
    <br/>
    <FormGroup row>
    <Label
      for="exampleNumber"
      size="lg"
      sm={2}
    >
      Select reviewer
    </Label>
   
    <Col sm={2}>
    <Input
      id="exampleSelect"
      name="select"
      type="select"
      
    >
       {staff.map((staff)=>(
          <option>
            {staff.staffId}
          </option>
      ))} 
    </Input>
    </Col>
  </FormGroup>
  <FormGroup>
    <Label  size="lg" sm={4} for="exampleText">
      Description
    </Label>
    <Col sm={4}>
    <Input
      id="exampleText"
      name="text"
      type="textarea"
      value={Description}
      onChange={(e)=>{setdescription(e.target.value)}}
    />
    </Col>
  </FormGroup>
  <button style={{float:"left"}}  className="btn btn-primary btn-lg"  onClick={(e)=>{requestReviewer(e)}}
            > Request</button>
  </Form>
    </Container>
    
    <Container>
    <div className="evaluate-content"> 
       <h2  align="center">Evaluate {GroupId} Thesis</h2>
       <hr></hr>
       <br></br>
       <Row>
         <Col>
           <Card className="report-card" >
           <div className="Post" > 
           <div id="report-cont"> 
               <Row>
               </Row>
               <br></br>  
               <Row>
                 <Col>Group Id : {GroupId} </Col>
               </Row>
               <br></br>
               <br></br>
               <Row>
                 <Col>Ducument : <a href="#" onClick={() => openDoc(docfileId)}>{doc} </a></Col>
               </Row>
               <br></br>
               <br></br>
               <Row>
                 <Col>Submissiosn Date : {new Date(submissionDate).toLocaleString()}</Col>
               </Row>
               <br></br>
               <br></br>
               <FormGroup row>
    <Label
      for="exampleNumber"
      size="lg"
      sm={4}
    >
      Input Marks :
    </Label>
    <Col sm={8}>
      <Input
        bsSize="lg"
        id="exampleNumber"
        name = "number"
        type = "number"
        value={marks}
        onChange={(e)=>{
          setmarks(e.target.value)
        }}
        required
      />
    </Col>
  </FormGroup>
               <br></br>
           </div>
           </div>
           </Card>
         </Col>
       </Row>
       <br></br>
       <Container>
          <div className="reportdownload">
            <Row>
              <Col>
                <button style={{float:"right"}}  className="btn btn-primary btn-lg"  onClick={(e)=>{submit(e)}}
            > Submit</button>
              </Col>
              <Col>
                    <button className="btn btn-primary btn-lg" onClick={(e)=>{navigate("/evaluate-thesis")}}>View Table</button>
              </Col>
            </Row>
            </div>
          </Container>
         <br/>
       </div>
    </Container>
    </div>
  )
}

export default EvalauteThesis