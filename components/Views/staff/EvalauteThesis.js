import React from 'react'
import { useNavigate, useParams } from "react-router-dom";


const EvalauteThesis = () => {
  const { id } = useParams();
  console.log(id)
  return (
    <div>Evalaute Thesis</div>
  )
}

export default EvalauteThesis