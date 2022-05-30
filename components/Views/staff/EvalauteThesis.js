import React,{useEffect,useState} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Container ,  Button} from 'react-bootstrap';
import { FaFileDownload } from "react-icons/fa";
import { Row, Col, Card, Container, Button,FormGroup,Label,Input } from "reactstrap";
import { Schema } from '@mui/icons-material';
import ReactDOM from 'react-dom';
import "../css/evaluatethesis.css"
import axios from "axios";

const EvalauteThesis = () => {
  const navigate = useNavigate()
  const [markingSchemes, setmarkingSchemes] = useState([]);
  const [GroupId, setGroupId] = useState("");
  const [doc, setdoc] = useState("");
  const [marks,setmarks] = useState(null); 
  const [submissionDate, setsubmissionDate] = useState("");
  const [submissionType, setsubmissionType] = useState("");

  const { id } = useParams();
  console.log(id)

  const openFile = (schema) => {
    console.log(schema)
    fetch(
      `http://localhost:8070/markingschemes/files/download/${schema.fileId}`
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


  const openDoc = (id) => {
    fetch(
      `http://localhost:8070/submissions/files/download/${id}`
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

  useEffect(() => {
    axios
      .get(`http://localhost:8070/submissions/getsubmission/${id}`)
      .then((res) => {
        console.log(res.data);
        setGroupId(res.data.GroupId);
        setdoc(res.data.document);
        setsubmissionDate(res.data.submissionDate);
        setsubmissionType(res.data.submissionType)
        if(res.data.marks !=0){
        setmarks(res.data.marks)
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
      alert("Please enter valid marks")
    }
    else{
    const newupdateddata = {
      GroupId,
      submissionDate,
      submissionType,
      marks,
      doc,
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


  return (
    <div> 
    <Container>
    <h2>Download Marking Schema</h2>
    {/* <Input type="select" name="select" id="exampleSelect" value={doc} onChange = {(e) =>{
                    setdoc(e.target.value);
                  }}   >     */}
    {markingSchemes.map((schema)=>{
    return(
     <li> <a href="#" onClick={() => openFile(schema)}>
                            {schema.document}
                          </a></li> 
    )
    })}  
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
                 <Col>Ducument : <a href="#" onClick={() => openDoc(id)}>{doc} </a></Col>
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