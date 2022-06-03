import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import PanelHeader from "../../../Shared/Header-panel";
import { IoHome } from "react-icons/io5";
import { RiFilePpt2Fill } from "react-icons/ri";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const EvaluateTopicDetails = () => {

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const navigate = useNavigate();
  const [topicDetailsubmissions, settopicDetailsubmission] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8070/submissions/get/TopicDetails`).then((response) => {

      settopicDetailsubmission(response.data)
    })
  }, [])

  return (

    <div><PanelHeader /><br />
      <h1 className="text-center font-weight-bold">Topic Detail Evaluation</h1>
      <br />
      <Container style={{ width: '100%' }} >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

          <button style={{ width: 'auto' }} className="btn btn-secondary" onClick={(e) => { navigate("/panel-home") }}
          > <IoHome /> go to home</button>

          <button style={{ width: 'auto' }} className="btn btn-secondary" onClick={(e) => { navigate("/evaluate-presentations") }}>
            <RiFilePpt2Fill />presentation submission</button>

        </div>
      </Container>
      <div className='container'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>No:</StyledTableCell>
                <StyledTableCell align="left">Group Id</StyledTableCell>
                <StyledTableCell align="left">Topic Detail Document</StyledTableCell>
                <StyledTableCell align="left">Submitted Date</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topicDetailsubmissions.map((data) => (
                <StyledTableRow key={data._id}>
                  <StyledTableCell component="th" scope="row">
                    {topicDetailsubmissions.indexOf(data) + 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">{data.GroupId}</StyledTableCell>
                  <StyledTableCell align="left">{data.document}</StyledTableCell>
                  <StyledTableCell align="left">{new Date(data.submissionDate).toLocaleString()}</StyledTableCell>
                  <StyledTableCell align="left">{data.status}</StyledTableCell>
                  <StyledTableCell align="center"><button onClick={
                    () => {
                      console.log(data._id)
                      navigate(`/evaluate-topic-details/${data._id}`)
                    }} type="button" class="btn btn-success"
                  >Evaluate Presentation
                  </button></StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default EvaluateTopicDetails