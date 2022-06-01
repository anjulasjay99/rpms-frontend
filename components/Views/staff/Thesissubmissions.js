import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { useNavigate } from "react-router-dom";
import SupervisorHeader from "../../Shared/Header-Supervisor,Co-supervisor";
const Evaluatedocument = () => {

  const navigate = useNavigate();
  const [submissions,setsubmissions] = useState([]);
  useEffect(()=>{
    axios.get(`http://localhost:8070/submissions/get/Thesis`).then((response)=>{
          
          setsubmissions(response.data)
    })
  },[])

  return (
    <div>
    <SupervisorHeader/>  
    <br/>  
    <h1 className="text-center font-weight-bold text-primary">Evaluate Thesis</h1>
    <br/><br/><br/>
    <div className='container'>
    <div className='row'>
    <div className='col-12'>
    <table className="table table-bordered">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Group Id</th>
        <th scope="col">Document</th>
        <th scope="col">Submission Date</th>
        <th scope="col">Marks</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      {submissions.map((data)=>{
        return(
          <tr>
          <td>{submissions.indexOf(data)+1}</td>
          <td>{data.GroupId}</td>
          <td>{data.document}</td>
          <td>{new Date(data.submissionDate).toLocaleString()}</td>
          <td>{data.marks == 0 ? "notmarked" : data.marks} </td>
          <td>   
          <button onClick={
            ()=>{
              console.log(data._id)
              navigate(`/thesis-evaluate/${data._id}`)}}type="button" class="btn btn-success"
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

export default Evaluatedocument