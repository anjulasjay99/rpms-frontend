import  { React} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Evaluatedocument from "./components/supervisor/evaluatedocument";
import Registration from "./components/supervisor/registration";
import Topicacception from "./components/supervisor/topicacception";

export default function App() {
  return(
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/register" element = {<Registration/>} exact/>
      <Route path="/evaluate" element = {<Evaluatedocument/>} exact/>
      <Route path="/accepttopic" element = {<Topicacception/>} exact/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
