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
import * as jobsService from "../../services/jobs-service";
import { JOBS_TERMS, JOBS_TYPES } from "../../context.js";
import Alert from 'react-bootstrap/Alert';

function CreateJobs({ user }) {

    const [alter, setAlter] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [company, setCompany] = useState("");
    const [term, setTerm] = useState("");
    const [jobType, setType] = useState("");
    const [link, setLink] = useState("");
    const [recommendation, setRecommendation] = useState("");
    const [comment, setComment] = useState("");
    const [allJobs, setAll] = useState([]);

    useEffect(async () => {
        jobsService.findAllJobs()
            .then(all => setAll(all));
    }, [])

    useEffect(async () => {
        for (let each of allJobs) {
            if (each.link === link) {
                setRepeat(true);
                console.log("reepat");
                return;
            }
        }
        setRepeat(false);
    }, [link, setLink])

    const handleSubmit = (event) => {
        event.preventDefault();
        const newJob = {};
        newJob.author = user.name;
        newJob.link = event.target[0].value;
        newJob.company = event.target[1].value;
        newJob.term = event.target[2].value;
        newJob.jobType = event.target[3].value;
        newJob.recommendation = event.target[4].value;
        newJob.comment = event.target[5].value;
        if (newJob.company !== "" && newJob.company !== null
            && newJob.link !== "" && newJob.link !== null
            && newJob.term !== "-" && newJob.term !== null
            && newJob.jobType !== "-" && newJob.jobType !== null) {
            jobsService.createJob(newJob);
            setAlter(false);
            window.location.reload();
        } else {
            setAlter(true);
        }
    }

    return (
        <Container>

            <Form onSubmit={handleSubmit}>
                <p></p>
                {alter ?
                    <Alert key="danger" variant="danger">
                        Something is missing!
                    </Alert> : null
                }
                {repeat ?
                    <Alert key="danger" variant="danger">
                        这个链接已经上传过了!
                    </Alert> : null
                }

                <Form.Group className="mb-3" >
                    <Form.Label>链接（必填）</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={e => {
                            setLink(e.target.value);
                        }} />
                    <Form.Text>
                        投递链接
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>公司名称（必填）</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={e => {
                            setCompany(e.target.value);
                        }} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>时间（必填）</Form.Label>
                    <Form.Control
                        as="select"
                        onChange={e => {
                            setType(e);
                        }}
                    >
                        {JOBS_TERMS.map(option => {
                            return <option value={option}>{option}</option>
                        })}
                    </Form.Control>
                    <Form.Text>
                        开始时间
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>工作类型（必填）</Form.Label>
                    <Form.Control
                        as="select"
                        onChange={e => {
                            setType(e);
                        }}
                    >
                        {JOBS_TYPES.map(option => {
                            return <option value={option}>{option}</option>
                        })}
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>推荐度</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={e => {
                            setRecommendation(e.target.value);
                        }} />
                    <Form.Text>
                        1-5 越高越推荐
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>备注</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={e => {
                            setComment(e.target.value);
                        }} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
        </Container>
    )

}

export default CreateJobs;