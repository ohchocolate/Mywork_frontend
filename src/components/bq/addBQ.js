import React from "react";
import Select from 'react-select';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { LEETCODE_TAGS } from "../../context.js";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './styles.css';
import * as leetcodeService from "../../services/leetcodes-service";

function AddOA({ oa }) {

    const navigate = useNavigate();

    const { lid } = useParams();
    const [mongoId, setMongoId] = useState();
    const [leetcode_id, setLeetcodeId] = useState();
    const [name, setName] = useState("");
    const [term, setTerm] = useState("");
    const [intro, setIntro] = useState("");
    const [link, setLink] = useState("");

    useEffect(() => {
        if (lid) {
            leetcodeService.findLeetcodesByID(lid)
                .then(arr => {
                    console.log(arr);
                    const cur = arr[0];
                    setName(cur.name);
                    setTerm(cur.term);
                    setIntro(cur.intro);
                    setLink(cur.link);
                    setMongoId(cur._id);
                    setLeetcodeId(cur.leetcode_id);
                }
                )
        }
    }, [])

    const sendData = (event) => {

        event.preventDefault();
        const newLeetcode = {};
        newLeetcode.leetcode_id = leetcode_id || Math.floor(Math.random() * 100000) + new Date().toISOString();
        newLeetcode.name = event.target[0].value;
        newLeetcode.term = event.target[1].value;
        newLeetcode.intro = event.target[2].value;
        newLeetcode.link = event.target[3].value;
        newLeetcode.oa = true;

        if (lid === undefined || lid === "" || lid === null) {
            leetcodeService.createLeetcode(newLeetcode).then(() =>
                navigate(`/leetcodes/${newLeetcode.leetcode_id}`)
            );
        } else {
            console.log(newLeetcode);
            leetcodeService.updateLeetcode(mongoId, newLeetcode).then(() =>
                navigate(`/leetcodes/${newLeetcode.leetcode_id}`)
            );
        }
    }

    return (
        <Container>
            <Form onSubmit={sendData}>
                <p></p>
                <Form.Group className="mb-3">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={e => {
                            setName(e.target.value);
                        }} />
                    <Form.Text>
                        IN ENGLISH
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>首次时间</Form.Label>
                    <Form.Control
                        type="text"
                        value={term}
                        onChange={e => {
                            setTerm(e.target.value);
                        }} />
                    <Form.Text>
                        网上最早出现的时间，格式: 2023-01-01
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>问题描述</Form.Label>
                    <Form.Control as="textarea"
                        type="text"
                        rows={3}
                        value={intro}
                        onChange={e => {
                            setIntro(e.target.value);
                        }} />
                    <Form.Text>
                        出现频率 + 题目大意
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>链接</Form.Label>
                    <Form.Control
                        type="text"
                        value={link}
                        onChange={e => {
                            setLink(e.target.value);
                        }} />
                    <Form.Text>
                        帖子链接
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
        </Container>
    )

}

export default AddOA;