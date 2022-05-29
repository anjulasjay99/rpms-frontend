import React,{useEffect,useState} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Container ,  Button} from 'react-bootstrap';
import { FaFileDownload } from "react-icons/fa";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Schema } from '@mui/icons-material';

const EvalauteThesis = () => {
  const [markingSchemes, setmarkingSchemes] = useState([]);
  const { id } = useParams();
  console.log(id)
  useEffect(() => {
  
    async function fetchData() {
      await fetch("https://rpms-backend.herokuapp.com/markingschemes/")
        .then((response) => response.json())
        .then((response) => {
          setmarkingSchemes(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchData();
  }, []);


  return (
    <div> 
    <Container>
    <FormGroup>
        <Label for="exampleSelect">Select</Label>
        <Input type="select" name="select" id="exampleSelect">    
    {markingSchemes.map((schema)=>{
      return(
          <option>{schema.document}</option> 
     )
    })}  
    </Input>
     </FormGroup>
    
    <h2>Download Marking Schema</h2>
    <Button variant="primary" size="lg" onClick = {() =>{
        downloadClick(name);
    }}><FaFileDownload></FaFileDownload>
        Download
    </Button>
    </Container></div>
  )
}

export default EvalauteThesis