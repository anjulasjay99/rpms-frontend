import react , {useState , useEffect} from 'react'
import axios from 'axios'

function topicTitle(){
    const researchAreas = ["Machine Learning" , "Deep Learning" , "Parallel Computing" , "Artificial Intelligence" , "Robotics"];
    return(
        <>
        <Container>
        <div className='TopicTitleSection'>
        <Form>
                <Form.Group className="mb-3" >
                <Form.Label>Topic</Form.Label>
                <Form.Control type="text" placeholder="Enter the Title" value = {LeaderID} onChange = {(e) =>{
                    setLeaderIDNumber(e.target.value)
                }}/>
                </Form.Group>

                <Form.Group className="mb-3" >
                <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown button
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {researchAreas.map((areas) =>(
                    <li><a class="dropdown-item" href="#">{areas}</a></li>
                ))}    
                </ul>
                </div>
                </Form.Group>

        </Form>        
        </div>
        <div className = 'SupervisorSection'>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Dr. Nuwan Kodagoda</Card.Title>
                <Card.Text>
                    <b>Research Area : </b> 
                    {/* Enter other info */}
                </Card.Text>
                <Button variant="primary" className = "supervisorSelection">Select Supervisor</Button>
            </Card.Body>
            </Card>
        </div>

        <Button variant="primary" >Submit</Button>

        </Container>


        </>
    )
}