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
import Table from 'react-bootstrap/Table';

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
        if (tag === 'All' || 'Select one tag' || null || "") {
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
            <div className="bg-white bg-opacity-10 ttr-rounded-15px mt-2 p-2">
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
                                    tag = "All";
                                }}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Row>
                </Form>

                <p></p>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>题号</th>
                            <th>题目</th>
                            <th>简介</th>
                            <th>重要性</th>
                            <th>错误率</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leetcodes.map(problem => {
                                return (
                                    <tr>
                                        <td>{problem.leetcode_id}</td>
                                        <td>{problem.name}</td>
                                        <td>{problem.intro}</td>
                                        <td>{averageValue(problem.ratings)}</td>
                                        <td>{averageValue(problem.failure)}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </Container>
    )
}

export default PublicLeetcode;