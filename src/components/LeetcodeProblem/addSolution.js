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
import './style.css';
import { Table } from "react-bootstrap";
import * as solutionsServices from "../../services/solutions-service";


function AddSolution({ user }) {

    const { lid } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { solution, problem } = location.state;
    const [shortAnswer, setShort] = useState("");
    const [longAnswer, setLong] = useState("");
    const [code, setCode] = useState("");
    const [importance, setImportance] = useState();
    const [repeat, setRepeat] = useState();

    useEffect(() => {
        setShort(solution.shortAnswer);
        setLong(solution.longAnswer);
        setCode(solution.code);
        setImportance(solution.ratingImportance);
        setRepeat(solution.ratingRepeat);
    }, [])

    const sendData = async (event) => {
        event.preventDefault();
        const newSolution = {};
        newSolution.uid = user.googleId;
        newSolution.username = user.name;
        newSolution.leetcode_id = lid;
        newSolution.shortAnswer = event.target[0].value;
        newSolution.longAnswer = event.target[1].value;
        newSolution.code = event.target[2].value;
        newSolution.ratingImportance = event.target[3].value;
        newSolution.ratingRepeat = event.target[4].value;

        if (solution._id) {
            await solutionsServices.updateSolution(solution._id, newSolution);
        }
        else {
            await solutionsServices.createSolution(newSolution);
        }

        setTimeout(() => {
            reset()
        }, 10);

    }

    const reset = () => {
        if (problem.leetcode_id.length > 5) {
            navigate(`/myoa`);
        } else {
            navigate(`/myleetcodes`);
        }

        // setTimeout(() => {
        //     window.location.reload();
        // }, 1000);
    }

    return (
        <Container>
            <Form onSubmit={sendData}>
                <p></p>
                <Table>
                    <thead>
                        <tr>
                            <th>题号</th>
                            <th>题目</th>
                            <th>简介</th>
                        </tr>
                        <tr>
                            <th>{problem.leetcode_id}</th>
                            <th>{problem.name}</th>
                            <td>{problem.intro}</td>
                        </tr>
                    </thead>
                </Table>
                <Form.Group className="mb-3">
                    <Form.Label>关键点</Form.Label>
                    <Form.Control
                        as="textarea"
                        type="text"
                        value={shortAnswer}
                        rows={2}
                        onChange={e => {
                            setShort(e.target.value);
                        }} />
                    <Form.Text>
                        一句话
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>分析</Form.Label>
                    <Form.Control
                        as="textarea"
                        type="text"
                        value={longAnswer}
                        rows={4}
                        onChange={e => {
                            setLong(e.target.value);
                        }} />
                    <Form.Text>
                        详细分析
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Code</Form.Label>
                    <Form.Control
                        as="textarea"
                        type="text"
                        rows={10}
                        value={code}
                        onChange={e => {
                            setCode(e.target.value);
                        }} />
                    <Form.Text>
                        代码
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>评分： 是否重要</Form.Label>
                    <Form.Control
                        type="text"
                        value={importance}
                        onChange={e => {
                            setImportance(e.target.value);
                        }} />
                    <Form.Text>
                        1-5 越高越重要
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>评分： 是否建议多刷</Form.Label>
                    <Form.Control
                        type="text"
                        value={repeat}
                        onChange={e => {
                            setRepeat(e.target.value);
                        }} />
                    <Form.Text>
                        1-5 越高越容易错
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
        </Container>
    )

}

export default AddSolution;