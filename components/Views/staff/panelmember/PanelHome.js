import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "../../css/homeCards.css";
import { Row, Col } from "react-bootstrap";
import { BsFillFileEarmarkPptFill, BsCardHeading } from "react-icons/bs";
import PanelHeader from "../../../Shared/Header-panel";

function PanelHome() {

    const navigate = useNavigate();

    return (
        <>
            <PanelHeader />
            <Box width="100%" />
            <Container>
                <Grid py={2} mx={3}>
                    <Typography variant="h3" ml={42} sx={{
                        fontWeight: "bold"
                    }}>
                        Panel Member Home
                    </Typography>
                </Grid>
            </Container>
            <br />
            <Container>
                <Row>
                    <Col>
                        <div className="home-card-div" onClick={(() => {
                            navigate('/evaluate-topic-details');

                        })}>
                            <div>
                                <BsCardHeading className="home-card-icon" />
                            </div>
                            <div>
                                <h4>Topic Details Evaluation</h4>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="home-card-div" onClick={(() => {

                            navigate('/evaluate-presentations');

                        })}>
                            <div>
                                <BsFillFileEarmarkPptFill className="home-card-icon" />
                            </div>
                            <div>
                                <h4>Presentation Evaluation</h4>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default PanelHome;
