import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { useNavigate } from "react-router-dom";

const EvaluateTopicDetails = () => {

  const navigate = useNavigate();
  const [topicDetailsubmissions,settopicDetailsubmission] = useState([]);
  useEffect(()=>{
    axios.get(`http://localhost:8070/submissions/get/TopicDetails`).then((response)=>{
          
          settopicDetailsubmission(response.data)
    })
  },[])

  return (
    <div><br/>  
    <h1 className="text-center font-weight-bold text-primary">Topic Detail Evaluation</h1>
    <br/><br/><br/>
    <div className='container'>
    <div className='row'>
    <div className='col-12'>
    <table className="table table-bordered">
    <thead>
      <tr>
        <th scope="col">No:</th>
        <th scope="col">Group Id</th>
        <th scope="col">Topic Detail Document</th>
        <th scope="col">Submitted Date</th>
        <th scope="col">Status</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      {topicDetailsubmissions.map((data)=>{
        return(
          <tr>
          <td>{topicDetailsubmissions.indexOf(data)+1}</td>
          <td>{data.GroupId}</td>
          <td>{data.document}</td>
          <td>{new Date(data.submissionDate).toLocaleString()}</td>
          <td>{data.status}</td>
          {/* <td>{data.marks == 0 ? "notmarked" : data.marks} </td> */}
          <td>   
          <button onClick={
            ()=>{
              console.log(data._id)
              navigate(`/evaluate-topic-details/${data._id}`)}}type="button" class="btn btn-success"
            >Evaluate Topic
            </button>
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

export default EvaluateTopicDetails