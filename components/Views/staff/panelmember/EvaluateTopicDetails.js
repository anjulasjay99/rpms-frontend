import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Container, Button, Input } from "reactstrap";
import "../../css/evaluatethesis.css"
import axios from "axios";
import PanelHeader from "../../../Shared/Header-panel";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const EvalautingTopicDetails = () => {
  const navigate = useNavigate()
  const [GroupId, setGroupId] = useState("");
  const [doc, setdoc] = useState("");
  const [marks, setmarks] = useState(null);
  const [status, setstatus] = useState(null);
  const [feedback, setfeedback] = useState(null);
  const [docfileId, setdocfileId] = useState("");
  const [submissionDate, setsubmissionDate] = useState("");
  const [submissionType, setsubmissionType] = useState("");

  const { id } = useParams();
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
      `https://rpms-backend.herokuapp.com/submissions/files/download/${docfileId}`
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
      .get(`https://rpms-backend.herokuapp.com/submissions/getsubmission/${id}`)
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
    console.log(feedback);

    if ((status == "rejected" || status == "accepted") && feedback == null) {
      alert("Please enter the evaluation feedback")
    } else {
      newupdateddata = {
        ...newupdateddata,
        feedback: feedback,
        status: status
      };
      console.log(newupdateddata);
      axios
        .put(`https://rpms-backend.herokuapp.com/submissions/update/${id}`, newupdateddata)
        .then((res) => {
          res.json
        })
        .catch((err) => {
          console.log(err);
        });
      alert("Successfully evaluated");
      navigate("/evaluate-topic-details");
    }
  }


  return (
    <div>
      <PanelHeader />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
        <Paper style={{ padding: 20, backgroundColor: '#B0C4DE' }}>
          <Grid container style={{ align: 'center', width: 500 }}>
            <Grid item xs={12}>
              <h2 align="center">Evaluate {GroupId}'s Topic Details</h2>
            </Grid>
            <Grid item xs={12} style={{ marginTop: 20, background: '#B0C4DE' }}>

              <Card style={{ background: '#F5F5F5' }}>
                <CardContent>
                  <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                    Group ID : {GroupId}
                  </Typography>
                  <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                    Document : <a href="#" onClick={() => openDoc(docfileId)}>{doc} </a>
                  </Typography>
                  <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                    Submission Date : {new Date(submissionDate).toLocaleString()}
                  </Typography>
                  <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                    Feedback :
                  </Typography>
                  <Input
                    bsSize="lg"
                    id="exampleText"
                    name="text"
                    type="textarea"
                    style={{ width: 400 }}
                    value={feedback}
                    onChange={(e) => {
                      setfeedback(e.target.value)
                    }}
                  />

                </CardContent>
                <CardActions style={{ textAlign: 'center', justifyContent: 'center' }}>

                  <button style={{ backgroundColor: 'blue', border: 'none' }} className="btn btn-secondary" value="accepted" onClick={(e) => { setstatus(e.target.value) }}>
                    Accept</button>

                  <button style={{ backgroundColor: 'red', border: 'none' }} className="btn btn-secondary" value="rejected" onClick={(e) => { setstatus(e.target.value) }}>
                    Reject</button>

                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} style={{ marginTop: 20, display: 'inherit', justifyContent: 'space-between' }} >

              <button style={{ backgroundColor: 'black', border: 'none' }} className="btn btn-primary" onClick={(e) => { navigate("/evaluate-topic-details") }}>
                Go back</button>

              <button style={{ backgroundColor: 'green', border: 'none' }} className="btn btn-primary" onClick={(e) => { submit(e) }}>
                Submit</button>

            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  )
}

export default EvalautingTopicDetails