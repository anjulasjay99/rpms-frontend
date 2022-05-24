import React , {useState , useEffect} from 'react';
import axios from 'axios'

function groupReg(){

    const [LeaderID , setLeaderIDNumber ] = useState("");
    const [LeaderNIC , setLeaderNIC ] = useState("");
    const [Leadermail , setLeaderMail ] = useState("");
    const [Leadercontact , setLeaderContactNumber ] = useState("");

    const [S2ID , setS2IDNumber ] = useState("");
    const [S2NIC , setS2NIC ] = useState("");
    const [S2mail , setS2Mail ] = useState("");
    const [S2contact , setS2ContactNumber ] = useState("");

    const [S3ID , setS3IDNumber ] = useState("");
    const [S3NIC , setS3NIC ] = useState("");
    const [S3mail , setS3Mail ] = useState("");
    const [S3contact , setS3ContactNumber ] = useState("");

    const [S4ID , setS4IDNumber ] = useState("");
    const [S4NIC , setS4NIC ] = useState("");
    const [S4mail , setS4Mail ] = useState("");
    const [S4contact , setS4ContactNumber ] = useState("");


    function submitClick(e){
        e.preventDefault();

        newGroup = {
            LeaderID , LeaderNIC , Leadermail , Leadercontact ,
            S2ID , S2NIC , S2mail , S2contact ,
            S3ID , S3NIC , S3mail , S3contact ,
            S4ID , S4NIC , S4mail , S4contact 
        }
        axios.post("http://localhost:8070/groups/add" , newGroup).then((res) =>{
            console.log(res);
            //Add Toast
        }).catch((e) =>{
            console.log(e);
        })
    }
        
    return(
        <>
        <Container>
        <div className = "formContainer">
            <h2 className = "heading">Member 1(Leader) Details</h2>
            <Form>
                <Form.Group className="mb-3" >
                <Form.Label>Leader ID Number</Form.Label>
                <Form.Control type="text" placeholder="Enter SLIIT ID Number" value = {LeaderID} onChange = {(e) =>{
                    setLeaderIDNumber(e.target.value)
                }}/>

                </Form.Group>
        
                <Form.Group className="mb-3" >
                <Form.Label>NIC</Form.Label>
                <Form.Control type="text" placeholder="Enter NIC" value = {LeaderNIC} onChange = {(e) =>{
                    setLeaderNIC(e.target.value)
                }} />
                </Form.Group>

                <Form.Group className="mb-3" >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" value = {Leadermail} onChange = {(e) =>{
                    setLeaderMail(e.target.value)
                }} />
                <Form.Text className="text-muted">
                    Please enter your SLIIT email.
                </Form.Text> 
                </Form.Group>

                <Form.Group className="mb-3" >
                <Form.Label>Contact Number</Form.Label>
                <Form.Control type="number" placeholder="Enter Contact Number" value = {Leadercontact} onChange = {(e)=>{
                    setLeaderContactNumber(e.target.value)
                }} />
                </Form.Group>                

            </Form>

            <h2 className = "heading">Member 2 Details</h2>
      
            <Form>
                <Form.Group className="mb-3" >
                <Form.Label>Leader ID Number</Form.Label>
                <Form.Control type="text" placeholder="Enter SLIIT ID Number" value = {S2ID} onChange = {(e) =>{
                    setS2IDNumber(e.target.value)
                }}/>

                </Form.Group>
        
                <Form.Group className="mb-3" >
                <Form.Label>NIC</Form.Label>
                <Form.Control type="text" placeholder="Enter NIC" value = {S2NIC} onChange = {(e) =>{
                    setS2NIC(e.target.value)
                }} />
                </Form.Group>

                <Form.Group className="mb-3" >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" value = {S2mail} onChange = {(e) =>{
                    setS2Mail(e.target.value)
                }} />
                <Form.Text className="text-muted">
                    Please enter your SLIIT email.
                </Form.Text> 
                </Form.Group>

                <Form.Group className="mb-3" >
                <Form.Label>Contact Number</Form.Label>
                <Form.Control type="number" placeholder="Enter Contact Number" value = {S2contact} onChange = {(e)=>{
                    setS2ContactNumber(e.target.value)
                }} />
                </Form.Group>                

            </Form>

            <h2 className = "heading">Member 3 Details</h2>
            <Form>
                <Form.Group className="mb-3" >
                <Form.Label>Leader ID Number</Form.Label>
                <Form.Control type="text" placeholder="Enter SLIIT ID Number" value = {S3ID} onChange = {(e) =>{
                    setS3IDNumber(e.target.value)
                }}/>

                </Form.Group>
        
                <Form.Group className="mb-3" >
                <Form.Label>NIC</Form.Label>
                <Form.Control type="text" placeholder="Enter NIC" value = {S3NIC} onChange = {(e) =>{
                    setS3NIC(e.target.value)
                }} />
                </Form.Group>

                <Form.Group className="mb-3" >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" value = {S3mail} onChange = {(e) =>{
                    setS3Mail(e.target.value)
                }} />
                <Form.Text className="text-muted">
                    Please enter your SLIIT email.
                </Form.Text> 
                </Form.Group>

                <Form.Group className="mb-3" >
                <Form.Label>Contact Number</Form.Label>
                <Form.Control type="number" placeholder="Enter Contact Number" value = {S3contact} onChange = {(e)=>{
                    setS3ContactNumber(e.target.value)
                }} />
                </Form.Group>                

            </Form>

            <h2 className = "heading">Member 4 Details</h2>
            <Form>
                <Form.Group className="mb-3" >
                <Form.Label>Leader ID Number</Form.Label>
                <Form.Control type="text" placeholder="Enter SLIIT ID Number" value = {S4ID} onChange = {(e) =>{
                    setS4IDNumber(e.target.value)
                }}/>

                </Form.Group>
        
                <Form.Group className="mb-3" >
                <Form.Label>NIC</Form.Label>
                <Form.Control type="text" placeholder="Enter NIC" value = {S4NIC} onChange = {(e) =>{
                    setS4NIC(e.target.value)
                }} />
                </Form.Group>

                <Form.Group className="mb-3" >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" value = {S4mail} onChange = {(e) =>{
                    setS4Mail(e.target.value)
                }} />
                <Form.Text className="text-muted">
                    Please enter your SLIIT email.
                </Form.Text> 
                </Form.Group>

                <Form.Group className="mb-3" >
                <Form.Label>Contact Number</Form.Label>
                <Form.Control type="number" placeholder="Enter Contact Number" value = {S4contact} onChange = {(e)=>{
                    setS4ContactNumber(e.target.value)
                }} />
                </Form.Group>                
 

                <Button variant="primary" type="submit" onClick = {(e) =>{
                    submitClick(e);
                }}  >
                Submit
                </Button> 
            </Form>
        </div>
        </Container>
        </>
    )
}

export default groupReg;