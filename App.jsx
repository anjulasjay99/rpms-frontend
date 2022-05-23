import  { React} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./components/supervisor/registration";
import RegisterStudent from "./components/Views/Student/Registration";

export default function App() {
  return(
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/register" element = {<Registration/>} />
      <Route path="/register-student" element = {<RegisterStudent/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}
