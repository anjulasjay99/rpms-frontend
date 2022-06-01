import axios from "axios";
import { Button } from "bootstrap";
import React from "react";
import { useState , useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container ,  Button} from 'react-bootstrap';
import { FaFileDownload } from "react-icons/fa";
import "../css/homeCards.css";
import { Row , Col } from "react-bootstrap";
import { BsFillFileEarmarkArrowUpFill } from "react-icons/bs";
import { borderColor } from "@mui/system";
function SubmitTopicDetails(){
    
    const [selectedFile , setSelectedFile] = useState("");
    const [fileId , setId] = useState("");
    const location = useLocation();
    const GroupId = "RSH1";
    console.log(location.state.name);
    var name = location.state.name;
    function onFileChange(event) {
        setSelectedFile(event.target.files[0]);
    }

    function downloadClick(n){
        n = "Presentation"
        axios.get(`http://localhost:8070/templates/getbyName/${n}`).then((res) =>{
            console.log(res);
            console.log(n);

             setId(res.data[0].fileId)

             fetch(`http://localhost:8070/templates/files/download/${fileId}`).then((res) => res.blob()).then((blob) =>{
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.setAttribute("download", name);
                link.setAttribute("target", "_blank");
                document.body.appendChild(link);
                link.click();
             })

            //  axios.get(`http://localhost:8070/templates/files/download/${fileId}`).then((res) =>{
            //      console.log(res);
            //      res.blob();
            //  }).then((blob) =>{
            //     const link = document.createElement("a");
            //     link.href = URL.createObjectURL(blob);
            //     link.setAttribute("download", name);
            //     link.setAttribute("target", "_blank");
            //     document.body.appendChild(link);
            //     link.click();
            //  })

           

        })
    }

    function onSubmitClick(){
        

        
      
        
        const formData = new FormData();

        formData.append(
            "document",
            selectedFile
          //  selectedFile.name
        );

        axios.post(`http://localhost:8070/submissions/submitDoc` , formData).then((res) =>{
            console.log(res.data.document);
            setDoc(res.data.document);
            
            console.log(doc);

        })
        .catch((err) =>{
            console.log(err);
        });

        const documentData = {
            GroupId,
            submissionType : name,
            document : "Report.docx",
           
        };
        console.log(documentData)
        axios.post(`http://localhost:8070/submissions/add/` , documentData).then((res) =>{
            console.log(res);
        }).then((res) =>{
            console.log("Success !");
        }).catch((err) =>{
            console.log(err);
        })

    }

    return(
        <>
            <Container style = {{}}>
                <h2 style = {{fontWeight : "bold"}}>{name}</h2> <br/>

                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label" style={{fontSize:"20px" }}>Submit your document below</label>
                    <input className="form-control" type="file" id="formFile" onChange={(event)=>{
                        onFileChange(event);
                    }}/> <br />
                    <Button variant="primary" style = {{marginLeft : "94%"}} onClick = {() =>{
                        onSubmitClick();
                    }}>Submit</Button>
                </div>

            </Container>
                    <hr />
            <Container >
            <Row>
                <Col >
                    <div  >
                    <h2 style={{marginTop : "4rem"}}>Download document template</h2> <br />
                    <Button variant="primary" size="lg" onClick = {() =>{
                        downloadClick(name);
                    }}>
                        Download<FaFileDownload></FaFileDownload>
                    </Button>
                    </div>  
                </Col>  

                <Col>
                <div className="home-card-div" onClick={(() =>{
                            navigate('/submissionTypes');
                            
                        })}>
                            <div>
                            <BsFillFileEarmarkArrowUpFill className="home-card-icon" />
                            </div>
                            <div>
                            <h4>View Other Submissions</h4>
                            </div>
                    </div>  

                </Col>
            </Row>
            </Container>
        </>
    )
}

export default SubmitTopicDetails;
