import React from "react";
import Select from 'react-select';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { LEETCODE_TAGS } from "../../context.js";
import { useLocation, useParams } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './style.css';
import * as leetcodeService from "../../services/leetcodes-service";

function AddNewLeetcode() {

    const [allProblems, setAll] = useState([]);
    const [newProblem, setProblem] = useState({})
    const [mongoId, setMongoId] = useState();
    const [leetcode_id, setID] = useState("");
    const [name, setName] = useState("");
    const [intro, setIntro] = useState("");
    const [link, setLink] = useState("");
    const [tags, setTags] = useState([]);
    const [prevFindProblem, setPrevProblem] = useState({});


    useEffect(() => {
        leetcodeService.findAllLeetcodes()
            .then(all => setAll(all));
    }, [])

    useEffect(() => {

        const curProblem = {};
        let find = false;
        for (let problem of allProblems) {
            if (leetcode_id === problem.leetcode_id) {
                setMongoId(problem._id);
                setName(problem.name);
                setIntro(problem.intro);
                setLink(problem.link);
                setTags(problem.tags);

                curProblem._id = mongoId;
                curProblem.leetcode_id = leetcode_id;
                curProblem.name = problem.name;
                curProblem.intro = problem.intro;
                curProblem.link = problem.link;
                curProblem.tags = tags;
                find = true;
                break;
            }
        }

        if (find) {

            setProblem(curProblem);
            setPrevProblem(curProblem);

        } else {

            setMongoId();
            if (name === prevFindProblem.name) {
                setName("");
            }
            if (intro === prevFindProblem.intro) {
                setIntro("");
            }
            if (link === prevFindProblem.link) {
                setLink("");
            }
            if (tags === prevFindProblem.tags) {
                setTags([]);
            }

            setProblem({
                "leetcode_id": leetcode_id,
                "name": name,
                "intro": intro,
                "link": link,
                "tags": tags
            });
        }

    }, [leetcode_id]);


    const sendData = (event) => {

        event.preventDefault();
        const newLeetcode = {};
        newLeetcode.leetcode_id = event.target[0].value;
        newLeetcode.name = event.target[1].value;
        newLeetcode.intro = event.target[2].value;
        newLeetcode.link = event.target[3].value;
        newLeetcode.tags = [].slice.call(event.target[4].selectedOptions).map(item => item.value);

        if (newLeetcode.leetcode_id === null || newLeetcode.leetcode_id === "") {
            return null;
        }

        let allNumbers = true;

        for (let char of newLeetcode.leetcode_id) {
            if (char < '0' || char > '9') {
                allNumbers = false;
                break;
            }
        }

        if (allNumbers) {
            if (mongoId === undefined || mongoId === "" || mongoId === null) {
                leetcodeService.createLeetcode(newLeetcode).then(() =>
                    reset()
                );
            } else {
                leetcodeService.updateLeetcode(mongoId, newLeetcode).then(() =>
                    reset()
                );
            }
        }
    }

    const reset = () => {
        window.location.reload();
    }

    return (

        <Form onSubmit={sendData}>
            <p></p>
            <Form.Group className="mb-3">
                <Form.Label>题号</Form.Label>
                <Form.Control
                    type="text"
                    onChange={e => {
                        setID(e.target.value);
                    }} />
                <Form.Text>
                    如果重复上传可自动更新
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>题目名称</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    onChange={e => {
                        setName(e.target.value);
                    }} />
                <Form.Text>
                    Leetcode题目
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>题目简介</Form.Label>
                <Form.Control as="textarea"
                    type="text"
                    rows={3}
                    value={intro}
                    onChange={e => {
                        setIntro(e.target.value);
                    }} />
                <Form.Text>
                    一句话理解题意
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
                    Leetcode Link
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
                    {LEETCODE_TAGS.map(option => {
                        return <option value={option}>{option}</option>
                    })}
                </Form.Control>
                <Form.Text>
                    知识点（按 Control/cmd 可多选）
                </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>

        </Form>
    )

}

export default AddNewLeetcode;