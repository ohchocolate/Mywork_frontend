import React from "react";
import Select from 'react-select';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { LEETCODE_TAGS } from "../../context.js";
import Table from 'react-bootstrap/Table';
import { Link, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import "./styles.css";
import * as leetcodeService from "../../services/leetcodes-service";
import * as solutionsService from "../../services/solutions-service";

function DisplayOA({ display, setName }) {

    return (
        <Container fluid>
            <div className="bg-white bg-opacity-10 ttr-rounded-15px mt-2 p-2">
                <Form>
                    <Row>
                        <Form.Group controlId="formBasicSelect" as={Col}>
                            <Form.Label>Search in English Name</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={e => {
                                    setName(e.target.value);
                                }}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <a href="#/oas/addoa">
                                <Button className="button" type="button" class="btn">
                                    New
                                </Button>
                            </a>
                        </Form.Group>
                    </Row>
                </Form>

                <p></p>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>时间</th>
                            <th>简述</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            display.map(problem => {
                                return (
                                    <tr>
                                        <td>{problem.name}</td>
                                        <td>{problem.term}</td>
                                        <td>{problem.intro}</td>
                                        <td>
                                            <Nav.Item>
                                                <Nav.Link href={problem.link}>链接</Nav.Link>
                                            </Nav.Item>
                                        </td>
                                        <td>
                                            <Nav.Item>
                                                <Nav.Link href={"#/oas/" + problem.leetcode_id}>解析</Nav.Link>
                                            </Nav.Item>
                                        </td>
                                        <td>
                                            <Nav.Item>
                                                <Nav.Link href={"#/oas/addoa/" + problem.leetcode_id}>编辑</Nav.Link>
                                            </Nav.Item>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </Container >
    )
}

export default DisplayOA;