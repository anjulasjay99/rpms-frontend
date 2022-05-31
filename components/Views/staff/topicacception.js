import { ControlCameraSharp } from '@mui/icons-material';
import { getAccordionDetailsUtilityClass } from '@mui/material';
import axios from 'axios';
import React,{useEffect,useState} from 'react'
import '../../css/topicacception.css'

const Topicacception = () => {


  // const [groupId,setgroupId] = useState([]);
  // const [field,setfield] = useState([]);
  // const [topic,settopic] = useState([]);
  // const [description,setdescription] = useState([]);
  // const [supervisorId,setsupervisorId] = useState([]);
  // const [isApproved,setisApproved] = useState([]);
  const [submissions,setsubmissions] = useState([]);
  useEffect(()=>{
    axios.get(`http://localhost:8070/topicsubs/get/sp002`).then((response)=>{
          
          setsubmissions(response.data)
    })
  },[])


  const getData = () => {
    axios.get(`http://localhost:8070/topicsubs/get/sp002`)
        .then((response) => {
          setsubmissions(response.data)
          console.log(response.data)
    })
    }

  const handleAccept = (data) =>{
  
   let groupId =  data.groupId
   let field =   data.field
   let description = data.description
   let topic  = data.topic
   let supervisorId = data.supervisorId
   data.isApproved = "Accepted"
   let isApproved = data.isApproved

    const newupdata = {
        groupId,
        field,
        topic,
        description,
        supervisorId,
        isApproved
    }
    
    axios.put(`http://localhost:8070/topicsubs/update/${data._id}`,newupdata).then((res)=>{
    
    getData()
    alert("Accepted") 
    }).catch((err) => {
        console.log(err)
    })
    
    
  }


  const handleReject = (data) =>{
  
   let groupId =  data.groupId
   let field =   data.field
   let description = data.description
   let topic  = data.topic
   let supervisorId = data.supervisorId
   data.isApproved = "Rejected"
   let isApproved = data.isApproved

    const newupdata = {
        groupId,
        field,
        topic,
        description,
        supervisorId,
        isApproved
    }
    console.log(newupdata)
    console.log(data._id) 
    axios.put(`http://localhost:8070/topicsubs/update/${data._id}`,newupdata).then((res)=>{
    getData()
    alert("Rejected") 
    }).catch((err) => {
        console.log(err)
    })
    
  }

  return (
    <div><br/>  
    <h1 className="text-center font-weight-bold text-primary">Accept Topics</h1>
    <br/><br/><br/>
    <div className='container'>
    <div className='row'>
    <div className='col-12'>
    <table className="table table-bordered">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Group Id</th>
        <th scope="col">Topic</th>
        <th scope="col">Status</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      {submissions.map((data)=>{
        return(
          <tr>
          <td>{submissions.indexOf(data)+1}</td>
          <td>{data.groupId}</td>
          <td>{data.topic}</td>
          <td>{data.isApproved}</td>
          <td>   
          <button onClick={()=>{handleAccept(data)}}type="button" class="btn btn-success">Accept</button>
          <button onClick={()=>{handleReject(data)}}type="button" class="btn btn-danger">Reject</button>
          </td>
        </tr>
        )
      })}
      
    </tbody>
  </table>
    </div>
    </div>  
    
  </div></div>
  )
}

export default Topicacception