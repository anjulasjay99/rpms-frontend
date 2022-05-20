import  { React} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./components/supervisor/registration";

export default function App() {
  return(
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/register" element = {<Registration/>} exact/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
