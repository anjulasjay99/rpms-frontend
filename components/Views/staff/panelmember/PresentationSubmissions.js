import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { useNavigate } from "react-router-dom";

const PresentationSubmissions = () => {

  const navigate = useNavigate();
  const [pptsubmissions,setpptsubmissions] = useState([]);
  useEffect(()=>{
    axios.get(`http://localhost:8070/submissions/get/Presentation`).then((response)=>{
          
          setpptsubmissions(response.data)
    })
  },[])

  return (
    <div><br/>  
    <h1 className="text-center font-weight-bold text-primary">Project Presentation Evaluation</h1>
    <br/><br/><br/>
    <div className='container'>
    <div className='row'>
    <div className='col-12'>
    <table className="table table-bordered">
    <thead>
      <tr>
        <th scope="col">No:</th>
        <th scope="col">Group Id</th>
        <th scope="col">Presentation Document</th>
        <th scope="col">Submitted Date</th>
        <th scope="col">Marks</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      {pptsubmissions.map((data)=>{
        return(
          <tr>
          <td>{pptsubmissions.indexOf(data)+1}</td>
          <td>{data.GroupId}</td>
          <td>{data.document}</td>
          <td>{new Date(data.submissionDate).toLocaleString()}</td>
          <td>{data.marks == 0 ? "notmarked" : data.marks} </td>
          <td>   
          <button onClick={
            ()=>{
              console.log(data._id)
              navigate(`/evaluate-presentations/${data._id}`)}}type="button" class="btn btn-success"
            >Evaluate
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

export default PresentationSubmissions