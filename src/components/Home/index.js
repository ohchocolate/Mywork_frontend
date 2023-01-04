import React from "react";
import Navigation from "../navigation";
import WhatsHappening from "../whats-happening";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rank from "../rank/rank";

function Home() {

    return (
        <Container className="container">
            <HashRouter>
                <Row className="ttr-tuiter">
                    <Col>
                        <div className="ttr-left-column">
                            <Navigation />
                        </div>
                    </Col>
                    <Col>
                        <div className="ttr-center-column">
                            <Routes>
                                <Route path="/rank" element={<Rank />} />
                            </Routes>
                        </div>
                    </Col>
                    <Col>
                        <div className="ttr-right-column">
                            <WhatsHappening />
                        </div>
                    </Col>
                </Row>
            </HashRouter>
        </Container >

    );
}
export default Home; 