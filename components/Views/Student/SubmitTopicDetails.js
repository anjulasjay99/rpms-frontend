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
import StudentHeader from "../../Shared/Header-student";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
function SubmitTopicDetails(){
    
    const navigate = useNavigate();
    const [selectedFile , setSelectedFile] = useState("");
    const [fileId , setId] = useState("");
    const [doc , setDoc] = useState("");
    const location = useLocation();
    var GroupId;
    console.log(location.state.name);
    var name = location.state.name;
    var template = name.replace("Submission" , "Template");
    var c;

    useEffect(()=>{
        ReactSession.setStoreType("memory");
        student = ReactSession.get("loginData");
        if(student == null){
            navigate('/student-login');
        }
        GroupId = student.GroupId;
    })
    console.log(template);
    function onFileChange(event) {
        setSelectedFile(event.target.files[0]);
    }

    function downloadClick(){
        
        axios.get(`https://rpms-backend.herokuapp.com/templates/getbyName/${template}`).then((res) =>{
            console.log(res);
            console.log(template);
            console.log(res.data[0].fileId);
            var fileid = res.data[0].fileId;
            var downDoc = res.data[0].document
            console.log(downDoc);

             fetch(`https://rpms-backend.herokuapp.com/templates/files/download/${fileid}`).then((res) => res.blob()).then((blob) =>{
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.setAttribute("download", downDoc);
                link.setAttribute("target", "_blank");
                document.body.appendChild(link);
                link.click();
             }).catch((err) =>{
                 console.log(err);
             })

            //  axios.get(`https://rpms-backend.herokuapp.com/templates/files/download/${fileId}`).then((res) =>{
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

    onSubmitClick = async ()=>{
        

        
        let docfileId = "" ;
        
        const formData = new FormData();

        formData.append(
            "document",
            selectedFile
          //  selectedFile.name
        );

        await axios.post(`https://rpms-backend.herokuapp.com/submissions/submitDoc` , formData).then((res) =>{
            console.log(res.data.document);
            c = res.data.document
            docfileId = res.data.fileId
            console.log(c);

        
        })
        .catch((err) =>{
            console.log(err);
        });

        const documentData = {
            GroupId,
            submissionType : name,
            document : c ,
            docfileId
        };
        axios.post(`https://rpms-backend.herokuapp.com/submissions/add/` , documentData).then((res) =>{
            console.log(res);
          alert("Submission Completed!");

            console.log(documentData);
            navigate('/student-home');
        }).then((res) =>{
            console.log("Success !");
        }).catch((err) =>{
            console.log(err);
        })

    }

    return(
        <>
        <StudentHeader/>

            <Container style = {{}}>
                <h2 style = {{fontWeight : "bold"}}>{name}</h2> <br/>

                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label" style={{fontSize:"20px" }}>Submit your document below</label>
                    <input className="form-control" type="file" id="formFile" onChange={(event)=>{
                        onFileChange(event);
                    }}/> <br />
                    <Button variant="primary"  onClick = {() =>{
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
                        downloadClick();
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