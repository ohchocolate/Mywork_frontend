import React from "react";
import Select from 'react-select';
import problems from "./problems.json";
import solutions from "./solution.json";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { LEETCODE_TAGS } from "../../context.js";
import { useLocation, useParams } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';

function SingleLeetcode() {


    const { uid, lid } = useParams();
    const userId = uid;
    const problemId = lid;

    const allLeetcodes = problems;
    let leetcode = {};

    const findLeetcode = () => {
        for (let problem of allLeetcodes) {
            if (problem._id === lid) {
                leetcode = problem;
                break;
            }
        }
    }

    const allSolutions = solutions;
    const otherSolutions = [];
    let mySolution = {};

    const findCurrentSolutions = () => {
        for (let sol of allSolutions) {
            if (sol.problem_id === problemId) {
                if (sol.uid === userId) {
                    mySolution = sol;
                } else {
                    otherSolutions.push(sol);
                }
            }
        }
    }

    return (
        <Container fluid>
            {findLeetcode()}
            {findCurrentSolutions()}
            <Form>
                <div className="bg-primary bg-opacity-10 ttr-rounded-15px mt-2 p-2">
                    <h2></h2>
                    <Nav.Item>
                        <Nav.Link href={leetcode.link}>Go To Leetcode</Nav.Link>
                    </Nav.Item>
                    <Row className="mb-3">
                        <Col ><h3>题号</h3></Col>
                        <Col ><h3>题目</h3></Col>
                    </Row>
                    <Row className="mb-3">
                        <Col >{leetcode.leetcode_id}</Col>
                        <Col >{leetcode.name}</Col>
                    </Row>
                    <Row>
                        <Card >
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">我的答案</Card.Subtitle>
                                <Card.Title>Key Points:   {mySolution.shortAnswer} </Card.Title>
                                <Card.Text>
                                    Memo: {mySolution.longAnswer}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>
                    {
                        otherSolutions.map(sol => {
                            return (
                                <Row>
                                    <Card >
                                        <Card.Body>
                                            <Card.Subtitle className="mb-2 text-muted">User:  {sol.user}</Card.Subtitle>
                                            <Card.Title>Key Points:   {sol.shortAnswer} </Card.Title>
                                            <Card.Text>
                                                Memo: {sol.longAnswer}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                            );
                        })
                    }
                </div>
            </Form>
        </Container>
    )

}

export default SingleLeetcode;