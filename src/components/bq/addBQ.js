import React from "react";
import Select from 'react-select';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { LEADERS } from "../../context.js";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './styles.css';
import * as leetcodeService from "../../services/leetcodes-service";

function AddBQ({ oa }) {

    const navigate = useNavigate();
    const { lid } = useParams();
    const [mongoId, setMongoId] = useState();
    const [leetcode_id, setLeetcodeId] = useState();
    const [name, setName] = useState("");
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (lid) {
            leetcodeService.findLeetcodesByID(lid)
                .then(arr => {
                    const cur = arr[0];
                    setName(cur.name);
                    setTags(cur.tags);
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
        newLeetcode.tags = [].slice.call(event.target[1].selectedOptions).map(item => item.value);
        newLeetcode.bq = true;

        if (lid === undefined || lid === "" || lid === null) {
            leetcodeService.createLeetcode(newLeetcode).then(() =>
                navigate(`/bqs/${newLeetcode.leetcode_id}`)
            );
        } else {
            console.log(newLeetcode);
            leetcodeService.updateLeetcode(mongoId, newLeetcode).then(() =>
                navigate(`/bqs/${newLeetcode.leetcode_id}`)
            );
        }
    }

    return (
        <Container>
            <Form onSubmit={sendData}>
                <p></p>
                <Form.Group className="mb-3">
                    <Form.Label>题目</Form.Label>
                    <Form.Control
                        as="textarea"
                        type="text"
                        rows={2}
                        value={name}
                        onChange={e => {
                            setName(e.target.value);
                        }} />
                    <Form.Text>
                        IN ENGLISH
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Tag</Form.Label>
                    <Form.Control
                        className="multi-select"
                        as="select"
                        multiple value={tags}
                        onChange={e => {
                            const tagsArr = [].slice.call(e.target.selectedOptions).map(item => item.value);
                            setTags(tagsArr);
                        }}
                    >
                        {LEADERS.map(option => {
                            return <option value={option}>{option}</option>
                        })}
                    </Form.Control>
                    <Form.Text>
                        （按 Control/cmd 可多选）
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
        </Container>
    )

}

export default AddBQ;