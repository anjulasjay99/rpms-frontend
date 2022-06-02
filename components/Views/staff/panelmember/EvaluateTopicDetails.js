import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Container, Button } from 'react-bootstrap';
import { FaFileDownload } from "react-icons/fa";
import { Row, Col, Card, Container, Button, FormGroup, Label, Input, Form } from "reactstrap";
import { Schema, SpatialAudioOffTwoTone } from '@mui/icons-material';
import ReactDOM from 'react-dom';
import "../../css/evaluatethesis.css"
import axios from "axios";

const EvalautingTopicDetails = () => {
  const navigate = useNavigate()
  const [markingSchemes, setmarkingSchemes] = useState([]);
  const [GroupId, setGroupId] = useState("");
  const [doc, setdoc] = useState("");
  const [marks, setmarks] = useState(null);
  const [status, setstatus] = useState(null);
  const [feedback, setfeedback] = useState(null);
  const [docfileId, setdocfileId] = useState("");
  const [submissionDate, setsubmissionDate] = useState("");
  const [submissionType, setsubmissionType] = useState("");
  const [staff, setstaff] = useState([]);
  const [Description, setdescription] = useState([]);

  const { id } = useParams();
  const accept = "accepted";
  const reject = "rejected";
  console.log(id)

  let newupdateddata = {
    GroupId,
    submissionDate,
    submissionType,
    marks,
    status,
    feedback,
    doc,
    docfileId
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
        setmarks(0);
        if (res.data.feedback != null) {
          setfeedback(res.data.feedback);
        }
        setstatus(res.data.status)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //submit data
  function submit(e) {
    // setstatus(statusvalue);
    console.log(feedback);

    if ((status == "rejected" || status == "accepted") && feedback == null) {
      alert("Please enter the evaluation feedback")
    } else {
      // const newupdateddata = {
      //   GroupId,
      //   submissionDate,
      //   submissionType,
      //   marks,
      //   status,
      //   feedback,
      //   doc,
      //   docfileId
      // };
      newupdateddata = {
        ...newupdateddata,
        feedback: feedback,
        status: status
      };
      console.log(newupdateddata);
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
        <div className="evaluate-content">
          <h2 align="center">Evaluate {GroupId}'s Topic Details</h2>
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
                      <Col>Group ID : {GroupId} </Col>
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
                        Feedback :
                      </Label>
                      <Col sm={8}>
                        <Input
                          bsSize="lg"
                          id="exampleText"
                          name="text"
                          type="textarea"
                          value={feedback}
                          onChange={(e) => {
                            setfeedback(e.target.value)
                          }}
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
                  <button style={{ float: "right" }} className="btn btn-primary btn-lg" value="accepted" onClick={(e) => {setstatus(e.target.value) }}>
                    Accept</button>
                </Col>
                <button style={{ float: "right" }} className="btn btn-primary btn-lg" onClick={(e) => { setstatus(reject); submit(e); }}>
                  Reject</button>
                <Col>
                  <button className="btn btn-primary btn-lg" onClick={(e) => { navigate("/evaluate-topic-details") }}>
                    Go back</button>
                </Col>
                <Col>
                  <button className="btn btn-primary btn-lg" onClick={(e) => { submit(e) }}>
                    Submit</button>
                </Col>
              </Row>
            </div>
          </Container>
          <br />
        </div>
      </Container>
    </div>
  )
}

export default EvalautingTopicDetails