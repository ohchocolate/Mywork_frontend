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
import fakeData from "./problems.json";


function AddNewLeetcode() {


    const allProblems = fakeData;

    const [leetcode_id, setID] = useState("");
    const [name, setName] = useState("");
    const [intro, setIntro] = useState("");
    const [link, setLink] = useState("");
    const [tags, setTags] = useState([]);
    const [prevFindProblem, setPrevProblem] = useState({});
    const [newProblem, setProblem] = useState({})

    useEffect(() => {
        const curProblem = {};
        let find = false;
        for (let problem of allProblems) {
            if (leetcode_id === problem.leetcode_id) {

                setName(problem.name);
                setIntro(problem.intro);
                setLink(problem.link);
                setTags(problem.tags);

                curProblem.leetcode_id = leetcode_id;
                curProblem.name = problem.name;
                curProblem.intro = problem.intro;
                curProblem.link = problem.link;
                curProblem.tags = tags;
                console.log(curProblem);
                find = true;
                break;
            }
        }

        if (find) {
            setProblem(curProblem);
            setPrevProblem(curProblem);
        } else {
            console.log(name);
            console.log(prevFindProblem);
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
                "name": name,
                "intro": intro,
                "link": link,
                "tags": tags
            });
        }

    }, [setID, leetcode_id]);

    return (

        <Form>
            <p></p>
            <Form.Group className="mb-3">
                <Form.Label>题号</Form.Label>
                <Form.Control
                    type="text"
                    onChange={e => {
                        console.log(e.target.value)
                        setID(e.target.value);
                    }} />
                <Form.Text>
                    如果重复上传可自动更新
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>题目名称</Form.Label>
                <Form.Control type="text" value={name} onChange={e => {
                    setName(e.target.value);
                }} />
                <Form.Text>
                    Leetcode题目
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>题目简介</Form.Label>
                <Form.Control as="textarea" type="text" rows={3} value={intro} onChange={e => {
                    setIntro(e.target.value);
                }} />
                <Form.Text>
                    一句话理解题意
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>链接</Form.Label>
                <Form.Control type="text" value={link} onChange={e => {
                    setLink(e.target.value);
                }} />
                <Form.Text>
                    Leetcode Link
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Tag</Form.Label>
                <Form.Control className="multi-select"
                    as="select"
                    multiple value={tags}
                    onChange={e => setTags([].slice.call(e.target.selectedOptions).map(item => item.value))}
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