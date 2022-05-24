import  { React} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Evaluatedocument from "./components/supervisor/evaluatedocument";
import Registration from "./components/supervisor/registration";
import Topicacception from "./components/supervisor/topicacception";
import RegisterStudent from "./components/Views/Student/Registration";

export default function App() {
  return(
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/evaluate" element = {<Evaluatedocument/>} exact/>
      <Route path="/accepttopic" element = {<Topicacception/>} exact/>
      <Route path="/register" element = {<Registration/>} />
      <Route path="/register-student" element = {<RegisterStudent/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}
