import axios from "axios";
import { Button } from "bootstrap";
import React from "react";
import { useState , useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container ,  Button} from 'react-bootstrap';
import { FaFileDownload } from "react-icons/fa";
function SubmitTopicDetails(){
    
    const [selectedFile , setSelectedFile] = useState("");
    const [fileId , setId] = useState("");
    const [doc , setDoc] = useState("");
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
            document : "Report.docx"

        };
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
            <Container>
                <h2>{name}</h2>

                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">Submit your document below</label>
                    <input className="form-control" type="file" id="formFile" onChange={(event)=>{
                        onFileChange(event);
                    }}/>
                    <Button variant="primary" onClick = {() =>{
                        onSubmitClick();
                    }}>Submit</Button>
                </div>

            </Container>

            <Container>
            <h2>Download document template</h2>
            <Button variant="primary" size="lg" onClick = {() =>{
                downloadClick(name);
            }}><FaFileDownload></FaFileDownload>
                Download
            </Button>
            </Container>
        </>
    )
}

export default SubmitTopicDetails;
