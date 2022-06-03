import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Card, Input } from "reactstrap";
import "../../css/evaluatethesis.css"
import axios from "axios";
import PanelHeader from "../../../Shared/Header-panel";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const EvalautePresentation = () => {
  const navigate = useNavigate()
  const [markingSchemes, setmarkingSchemes] = useState([]);
  const [GroupId, setGroupId] = useState("");
  const [doc, setdoc] = useState("");
  const [marks, setmarks] = useState(null);
  const [feedback, setfeedback] = useState(null);
  const [status, setstatus] = useState("");
  const [docfileId, setdocfileId] = useState("");
  const [submissionDate, setsubmissionDate] = useState("");
  const [submissionType, setsubmissionType] = useState("");

  const { id } = useParams();
  console.log(id);

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

  //download marking schema
  const openFile = (schema) => {
    console.log(schema)
    fetch(
      `https://rpms-backend.herokuapp.com/markingschemes/files/download/${schema.fileId}`
    )
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
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
      .get(`https://rpms-backend.herokuapp.com/submissions/getsubmission/${id}`)
      .then((res) => {
        console.log(res.data);
        setGroupId(res.data.GroupId);
        setdoc(res.data.document);
        setsubmissionDate(res.data.submissionDate);
        setsubmissionType(res.data.submissionType);
        setdocfileId(res.data.docfileId);
        setstatus(res.data.status);
        console.log(doc);
        if (res.data.marks != 0) {
          setmarks(res.data.marks)
        }
        if (res.data.feedback != null) {
          setfeedback(res.data.feedback)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //submit data
  function submit(e) {

    if (marks == null || marks == 0) {
      alert("please enter marks")
    }
    else if (marks < 0) {
      alert("Entered marks are not valid")
    }
    else {
      newupdateddata = {
        ...newupdateddata,
        feedback: feedback
      };
      console.log(newupdateddata)
      axios
        .put(`https://rpms-backend.herokuapp.com/submissions/update/${id}`, newupdateddata)
        .then((res) => {
          res.json
        })
        .catch((err) => {
          console.log(err);
        });
      alert("Successfully marked the presentation")
      navigate("/evaluate-presentations")
    }
  }

  return (
    <div>
      <PanelHeader />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
        <Paper style={{ padding: 20, backgroundColor: '#B0C4DE' }}>
          <Grid container columns={16} style={{ alignItems: 'center' }} spacing={2}>
            <Grid item xs={16}>
              <h2 align="center">Evaluate {GroupId} Group Presentation</h2>
            </Grid>
            <Grid item xs={8}>

              <Grid item xs={16} style={{ marginTop: 20, background: '#B0C4DE' }}>

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
                      Marks :
                    </Typography>
                    <Input
                      bsSize="lg"
                      id="exampleNumber"
                      name="number"
                      type="number"
                      value={marks}
                      onChange={(e) => {
                        setmarks(e.target.value)
                      }}
                      required
                    />
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
                </Card>
              </Grid>

              <Grid item xs={16} style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between' }} >

                <button style={{ backgroundColor: 'black', border: 'none' }} className="btn btn-primary" onClick={(e) => { navigate("/evaluate-presentations") }}>
                  Go back</button>

                <button style={{ backgroundColor: 'green', border: 'none' }} className="btn btn-primary" onClick={(e) => { submit(e) }}>
                  Submit</button>

              </Grid>
            </Grid>

            <Grid item xs={8} >
              <Grid item xs={16}>
                <h3>Download Marking Schema</h3>
              </Grid>
              <Grid item xs={16} >
                {markingSchemes.map((schema) => {
                  return (
                    <li> <a href="#" onClick={() => openFile(schema)}>
                      {schema.document}
                    </a></li>
                  )
                })}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  )
}

export default EvalautePresentation