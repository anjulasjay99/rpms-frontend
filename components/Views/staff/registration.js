import { React, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Registration = () => {

    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [sliitEmail, setsliitEmail] = useState("");
    const [telNo, settelNo] = useState("");
    const [password, setpassword] = useState("");
    const [staffId,setstaffId ] = useState("");
    const [field, setfield] = useState("Machine Learning");
    const [role, setrole] = useState("staff");

    const navigate = useNavigate();

    function Register(e){
        e.preventDefault();
    const newUser = {
      firstName,
      lastName,
      sliitEmail,
      telNo,
      password,
      staffId,
      field,
      role
    };
    axios
      .post("http://localhost:8070/staff/save", newUser)
      .then((res) => {
        console.log(res.data)  
        setfirstName("");
        setlastName("");
        setsliitEmail("");
        settelNo("");
        setfield("");
        setpassword("");
        setstaffId("");
      })
      .catch((err) => {
        alert(err);
      });
      alert("Staff Registered");
      navigate("/");
    }

  return (
   <div>
   <br/>  
   <h1 className="text-center font-weight-bold text-primary">Staff Registration</h1>
   <div className="container">
   <div className='mt-5'>
   <div>
   <form onSubmit={Register} className="row g-4">
   <div className="col-md-6">
      <label for="inputsliitEmail4" className="form-label">First Name</label>
      <input type="text" value={firstName} onChange={(e)=>{setfirstName(e.target.value)}} className="form-control" id="inputsliitEmail4" pattern="[A-Za-z]+" required="required"/>
    </div>
    <div className="col-md-6">
      <label for="inputpassword4" className="form-label">Last Name</label>
      <input type="text" value={lastName} onChange={(e)=>{setlastName(e.target.value)}}className="form-control" id="inputpassword4" pattern="[A-Za-z]+" required="required"/>
    </div>
    <div className="col-12">
      <label for="inputAddress" className="form-label">Staff ID</label>
      <input type="text" value={staffId} onChange={(e)=>{setstaffId(e.target.value)}}className="form-control" id="inputAddress" pattern="[sS]{1}[tT][0-9]{8}" required="required"/>
    </div>
    <div className="col-md-12">
      <label for="inputCity" className="form-label">SLIIT Email</label>
      <input type="sliitEmail" value={sliitEmail} onChange={(e)=>{setsliitEmail(e.target.value)}} className="form-control" id="inputCity"   title="follow requested format Ex:([staffnumber.my.sliit.lk])"  pattern="[sS]{1}[tT]{1}[0-9]{8}[@][m]{1}[y]{1}\.[s]{1}[l]{1}[i]{1}[i]{1}[t]{1}\.[l]{1}[k]{1}"   required="required"  />
    </div>
    <div className="col-md-12">
      <label for="inputCity" className="form-label">Contact Number</label>
      <input type="sliitEmail" value={telNo} onChange={(e)=>{settelNo(e.target.value)}}className="form-control" id="inputCity" pattern = "[0-9]{10}" title="input 10 digits" required="required"/>
    </div>
    <div className="col-md-12">
      <label for="inputState" className="form-label">Research field</label>
      <select value={field} onChange={(e)=>{setfield(e.target.value)}} id="inputState" className="form-select" required="required">
        <option selected>Machine Learning</option>
        <option>Deep Learning</option>
        <option>Parallel Computing</option>
      </select>
    </div>
    <div className="col-md-12">
      <label for="inputZip" className="form-label">password</label>
      <input  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" type="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} className="form-control" id="inputZip" required/>
    </div>

    <div className="col-12">
    <div class="d-grid gap-2">
      <button type="submit" className="btn btn-primary ">Sign in</button>
    </div>
    </div>
  </form></div>
   </div>
   </div>       
  
      </div>
    
  )
}

export default Registration;