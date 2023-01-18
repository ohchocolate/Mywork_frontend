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
import { LEADERS } from "../../context.js";

function DisplayBQ({ display, setName, setTag }) {

    return (
        <Container fluid>
            <div className="bg-white bg-opacity-10 ttr-rounded-15px mt-2 p-2">
                <Form>
                    <Row>
                        <Form.Group controlId="formBasicSelect" as={Col}>
                            <Form.Label>Search</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={e => {
                                    setName(e.target.value);
                                }}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicSelect" as={Col}>
                            <Form.Label>Select A Tag</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={e => {
                                    setTag(e.target.value);
                                }}
                            >
                                {LEADERS.map(option => {
                                    return <option value={option}>{option}</option>
                                })}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <a href="#/bqs/addbq">
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
                            <th>Question</th>
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
                                        <td>
                                            <Nav.Item>
                                                <Nav.Link href={"#/bqs/" + problem.leetcode_id}>解析</Nav.Link>
                                            </Nav.Item>
                                        </td>
                                        <td>
                                            <Nav.Item>
                                                <Nav.Link href={"#/bqs/addbq/" + problem.leetcode_id}>编辑</Nav.Link>
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

export default DisplayBQ;