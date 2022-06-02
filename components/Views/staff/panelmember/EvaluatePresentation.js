import React,{useEffect,useState} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Container ,  Button} from 'react-bootstrap';
import { FaFileDownload } from "react-icons/fa";
import { Row, Col, Card, Container, Button,FormGroup,Label,Input,Form } from "reactstrap";
import { Schema, SpatialAudioOffTwoTone } from '@mui/icons-material';
import ReactDOM from 'react-dom';
import "../../css/evaluatethesis.css"
import axios from "axios";

const EvalautePresentation = () => {
  const navigate = useNavigate()
  const [markingSchemes, setmarkingSchemes] = useState([]);
  const [GroupId, setGroupId] = useState("");
  const [doc, setdoc] = useState("");
  const [marks,setmarks] = useState(null);
  const [feedback, setfeedback] = useState(null);
  const [status, setstatus] = useState("");
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
        setsubmissionType(res.data.submissionType);
        setdocfileId(res.data.docfileId);
        setstatus(res.data.status);
        console.log(doc);
        if(res.data.marks !=0){
        setmarks(res.data.marks)
        }
        if (res.data.feedback != "") {
            setfeedback(res.data.feedback)
        }
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
      alert("Entered marks are not valid")
    }
    else{
    const newupdateddata = {
        GroupId,
        submissionDate,
        submissionType,
        marks,
        feedback,
        doc,
        docfileId,
        status
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
      alert("Successfully marked the presentation")
    }
  }

  return (
    <div> 
    <Container>
    <h2>Download Marking Schema</h2>
    {markingSchemes.map((schema)=>{
    return(
     <li> <a href="#" onClick={() => openFile(schema)}>
                            {schema.document}
                          </a></li> 
    )
    })}  
    <br/>
    </Container>
    
    <Container>
    <div className="evaluate-content"> 
       <h2  align="center">Evaluate {GroupId} Group Presentation</h2>
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
                 <Col>Document : <a href="#" onClick={() => openDoc(docfileId)}>{doc} </a></Col>
               </Row>
               <br></br>
               <br></br>
               <Row>
                 <Col>Submission Date : {new Date(submissionDate).toLocaleString()}</Col>
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
  <FormGroup row>
  <Label
      for="exampleNumber"
      size="lg"
      sm={4}
    >
      Feedback :
    </Label>
    <Col sm={8}>
      <Input
        bsSize="lg"
        id="exampleNumber"
        name = "text"
        type = "text"
        value={feedback}
        onChange={(e)=>{
          setfeedback(e.target.value)
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
                    <button className="btn btn-primary btn-lg" onClick={(e)=>{navigate("/evaluate-presentations")}}>View Table</button>
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

export default EvalautePresentation