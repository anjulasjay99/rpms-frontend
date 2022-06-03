import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { ReactSession } from "react-client-session";
import '../../css/topicacception.css'
import SupervisorHeader from "../../Shared/Header-Supervisor-Co-supervisor";

const Topicacception = () => {

  let staffId
  //staffId = ReactSession.get("staffId");
  console.log("staff")
  console.log(staffId)
  const [submissions,setsubmissions] = useState([]);
  staffId = sessionStorage.getItem("staffId");
  
  useEffect(()=>{
    
    console.log(staffId)
    axios.get(`https://rpms-backend.herokuapp.com/topicsubs/get/${staffId}`).then((response)=>{
          
          setsubmissions(response.data)
    })
  },[])


  const getData = () => {
  
    axios.get(`https://rpms-backend.herokuapp.com/topicsubs/get/${staffId}`)
        .then((response) => {
          setsubmissions(response.data)
          //console.log(response.data)
    })
    }

  const handleAccept = (data) =>{
  
   console.log(data)
   console.log(data.topic)
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
    
    axios.put(`https://rpms-backend.herokuapp.com/topicsubs/update/${data._id}`,newupdata).then((res)=>{
    
    getData()
    alert("Accepted") 
    }).catch((err) => {
        console.log(err)
    })
    
    
  }


  const handleReject = (data) =>{

    console.log(data)
    console.log(data.topic)
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
    //console.log(newupdata)
    //console.log(data._id) 
    axios.put(`https://rpms-backend.herokuapp.com/topicsubs/update/${data._id}`,newupdata).then((res)=>{
    getData()
    alert("Rejected") 
    }).catch((err) => {
        console.log(err)
    })
    
  }

  return (
    <div>
    <SupervisorHeader/>
    <br/>  
    <h1 className="text-center font-weight-bold text-primary">Accept Topic Title</h1>
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
          <button onClick={()=>{
            console.log(data)
            handleAccept(data)}}type="button" class="btn btn-success">Accept</button>
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