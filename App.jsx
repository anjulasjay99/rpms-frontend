import  { React} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterStudent from "./components/Views/Student/Registration";
import groupReg from "./components/Views/Student/GroupRegistration";
import Registration from "./components/Views/staff/registration";
import Evaluatedocument from "./components/Views/staff/evaluatedocument";
import Topicacception from "./components/Views/staff/topicacception";
import GroupReg from "./components/Views/Student/GroupRegistration";
import SubmitTopicDetails from "./components/Views/Student/SubmitTopicDetails";
import SubmissionTypes from "./components/Views/Student/SubmissionTypes";
import TopicTitle from "./components/Views/Student/TopicTitleSub";
import ViewSubstopic from "./components/Views/Student/ViewTopicTitleSubmissions";
import CoSupervisorSelect from "./components/Views/Student/Cosupervisor";
import StudentHome from "./components/Views/Student/StudentHome";

export default function App() {
  return(
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/evaluate" element = {<Evaluatedocument/>} exact/>
      <Route path="/accepttopic" element = {<Topicacception/>} exact/>
      <Route path="/register" element = {<Registration/>} />
      <Route path="/register-student" element = {<RegisterStudent/>} />
      <Route path="/register-group" element = {<GroupReg/>} />
      <Route path="/submissions" element = {<SubmitTopicDetails/>} />
      <Route path="/submissionTypes" element = {<SubmissionTypes/>} />
      {/* <Route path="/topic-registration" element = {<Topictitle/>}  /> */}
      <Route path="/ViewSubmissions" element = {<ViewSubstopic/>} />
      <Route path="/topic" element = {<TopicTitle/>} />
      <Route path="/select-Cosupervisor" element = {<CoSupervisorSelect/>} />
       <Route path="/student-home" element = {<StudentHome/>} /> 
      </Routes>
      </BrowserRouter>
    </div>
  )
}
