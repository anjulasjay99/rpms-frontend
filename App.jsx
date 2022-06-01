import  { React} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterStudent from "./components/Views/Student/Registration";
import Registration from "./components/Views/staff/registration";
import Evaluatedocument from "./components/Views/staff/Thesissubmissions";
import Topicacception from "./components/Views/staff/topicacception";
import GroupReg from "./components/Views/Student/GroupRegistration";
import SubmitTopicDetails from "./components/Views/Student/SubmitTopicDetails";
import SubmissionTypes from "./components/Views/Student/SubmissionTypes";
import TopicTitle from "./components/Views/Student/TopicTitleSub";
import ViewSubstopic from "./components/Views/Student/ViewTopicTitleSubmissions";
import CoSupervisorSelect from "./components/Views/Student/Cosupervisor";
import StudentHome from "./components/Views/Student/StudentHome";
import LoginStudent from "./components/Shared/Login";
import StaffHome from "./components/Views/staff/StaffHome";
import EvalauteThesis from "./components/Views/staff/EvalauteThesis";


import LoginType from "./components/Shared/LoginType";
import StaffLogin from "./components/Shared/StaffLogin";


export default function App() {
  return(
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/evaluate-thesis" element = {<Evaluatedocument/>} exact/>
      <Route path="/accepttopic" element = {<Topicacception/>} exact/>
      <Route path="/register-staff" element = {<Registration/>} />
      <Route path="/register-student" element = {<RegisterStudent/>} />
      <Route path="/register-group" element = {<GroupReg/>} />
      <Route path="/submissions" element = {<SubmitTopicDetails/>} />
      <Route path="/submissionTypes" element = {<SubmissionTypes/>} />
      {/* <Route path="/topic-registration" element = {<Topictitle/>}  /> */}
      <Route path="/ViewSubmissions" element = {<ViewSubstopic/>} />
      <Route path="/topic" element = {<TopicTitle/>} />
      <Route path="/co-supervisor" element = {<CoSupervisorSelect/>} />
       <Route path="/student-home" element = {<StudentHome/>} /> 
       <Route path="/student-login" element = {<LoginStudent/>} /> 
       <Route path="/staff-login" element = {<StaffLogin/>} /> 
       <Route path="/staff-home" element = {<StaffHome/>} /> 
       <Route path="/thesis-evaluate/:id" element = {<EvalauteThesis/>} /> 
       <Route path="/logintype" element = {<LoginType/>} /> 
      </Routes>
      </BrowserRouter>
    </div>
  )
}
