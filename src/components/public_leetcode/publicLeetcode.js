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

function PublicLeetcode() {
    const leetcode_tags = LEETCODE_TAGS;
    let tag = "All";
    const [leetcodes, setLeetcodes] = useState([]);

    let averageValue = (obj) => {
        let totalValue = 0;
        let totalUser = 0;
        for (let property in obj) {
            totalValue += obj[property];
            totalUser++;
        }
        return totalValue / totalUser;
    }

    const refreshLeetcodes = () => {
        const allLeetcodes = problems;
        if (tag === 'All') {
            setLeetcodes(allLeetcodes);
        } else {
            const tagLeetcodes = [];
            for (let problem of allLeetcodes) {
                for (let tagOfProblem of problem.tags) {
                    if (tagOfProblem === tag) {
                        tagLeetcodes.push(problem);
                    }
                }
            }
            setLeetcodes(tagLeetcodes);
        }
    };

    const selectLeetcode = (leetcode_id) => {
        const allLeetcodes = problems;
        const tagLeetcodes = [];
        for (let problem of allLeetcodes) {
            if (problem.leetcode_id === leetcode_id) {
                tagLeetcodes.push(problem);
                break;
            }
        }
        setLeetcodes(tagLeetcodes);
    }

    return (
        <Container fluid>
            <div className="bg-primary bg-opacity-10 ttr-rounded-15px mt-2 p-2">
                <Form>
                    <Row>
                        <Form.Group controlId="formBasicSelect" as={Col}>
                            <Form.Label>Select A Tag</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={e => {
                                    tag = e.target.value;
                                    refreshLeetcodes();
                                }}
                            >
                                {leetcode_tags.map(option => {
                                    return <option value={option}>{option}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicSelect" as={Col}>
                            <Form.Label>Search</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={e => {
                                    selectLeetcode(e.target.value);
                                }}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Row>
                </Form>

                <h2></h2>
                <Row>
                    <Col xs={1}><h3>题号</h3></Col>
                    <Col xs={2}><h3>题目</h3></Col>
                    <Col><h3>简介</h3></Col>
                    <Col xs={1}><h5>重要性</h5></Col>
                    <Col xs={1}><h5>失败率</h5></Col>
                </Row>
                {
                    leetcodes.map(problem => {
                        return (
                            <Row>
                                <Col xs={1}>{problem.leetcode_id}</Col>
                                <Col xs={2}>{problem.name}</Col>
                                <Col>{problem.intro}</Col>
                                <Col xs={1}>{averageValue(problem.ratings)}</Col>
                                <Col xs={1}>{averageValue(problem.failure)}</Col>
                            </Row>
                        );
                    })
                }
            </div>
        </Container>
    )
}

export default PublicLeetcode;