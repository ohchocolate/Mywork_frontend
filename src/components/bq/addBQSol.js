import React from "react";
import Select from 'react-select';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { LEETCODE_TAGS } from "../../context.js";
import { useLocation, useParams, useNavigate, Navigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './styles.css';
import { Table } from "react-bootstrap";
import * as solutionsServices from "../../services/solutions-service";


function AddBQSol({ user }) {

    const { lid } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { solution, problem } = location.state;
    const [code, setCode] = useState("");

    useEffect(() => {
        setCode(solution.code);
    }, [])

    const sendData = (event) => {
        event.preventDefault();
        const newSolution = {};
        newSolution.uid = user.googleId;
        newSolution.username = user.name;
        newSolution.leetcode_id = lid;
        newSolution.code = event.target[0].value;
        if (solution._id) {
            solutionsServices.updateSolution(solution._id, newSolution)
                .then(reset());
        }
        else {
            solutionsServices.createSolution(newSolution)
                .then(reset());
        }
    }

    const reset = () => {
        navigate(`/bqs/${problem.leetcode_id}`);
    }

    return (
        <Container>
            <Form onSubmit={sendData}>
                <p></p>
                <Table>
                    <thead>
                        <tr>
                            <th>题目</th>
                        </tr>
                        <tr>
                            <th>{problem.name}</th>
                        </tr>
                    </thead>
                </Table>

                <Form.Group className="mb-3" >
                    <Form.Label>Answer</Form.Label>
                    <Form.Control
                        as="textarea"
                        type="text"
                        rows={20}
                        value={code}
                        onChange={e => {
                            setCode(e.target.value);
                        }} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
        </Container>
    )

}

export default AddBQSol;