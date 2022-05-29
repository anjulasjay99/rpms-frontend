import  { React} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterStudent from "./components/Views/Student/Registration";
import groupReg from "./components/Views/Student/GroupRegistration";
import Registration from "./components/Views/staff/registration";
import Evaluatedocument from "./components/Views/staff/evaluatedocument";
import Topicacception from "./components/Views/staff/topicacception";
export default function App() {
  return(
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/evaluate" element = {<Evaluatedocument/>} exact/>
      <Route path="/accepttopic" element = {<Topicacception/>} exact/>
      <Route path="/register" element = {<Registration/>} />
      <Route path="/register-student" element = {<RegisterStudent/>} />
      <Route path="/register-group" element = {<groupReg/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}
