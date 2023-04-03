import React from "react";
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
import * as jobsService from "../../services/jobs-service";
import { JOBS_TERMS, JOBS_TYPES } from "../../context.js";

function Jobs({ user }) {

    const [allJobs, setAll] = useState([]);
    const [displayJobs, setDisplay] = useState([]);
    const [myJobs, setMyJobs] = useState([]);
    const [term, setTerm] = useState("All");
    const [jobType, setType] = useState("All");

    useEffect(() => {
        const selected = [];
        for (let each of allJobs) {
            if (term === "All" || term === each.term) {
                if (each.jobType === jobType || jobType === "All") {
                    selected.push(each);
                }
            }
        }
        setDisplay(selected);
    }, [term, jobType])

    useEffect(() => {
        jobsService.findAllJobs()
            .then(all => {
                all.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
                setDisplay(all);
                setAll(all);
            });

        jobsService.findMyJobsById(user.googleId)
            .then(myJobs => {
                if (myJobs[0] && myJobs[0].uid) {
                    const myList = myJobs[0].list;
                    setMyJobs(myList);
                } else {
                    const newMyJobs = {};
                    newMyJobs.uid = user.googleId;
                    newMyJobs.list = [];
                    jobsService.createMyJobs(user.googleId, newMyJobs)
                        .then(data => setMyJobs(data.list));
                }
            });
    }, [])

    const toggleApply = (jid) => {
        let newList;
        if (myJobs.includes(jid)) {

            newList = myJobs.filter(my => my !== jid)
            setMyJobs(newList);

        } else {
            newList = [...myJobs, jid]
            setMyJobs(newList);
        }

        const newMyJob = {};
        newMyJob.uid = user.googleId;
        newMyJob.list = newList;
        jobsService.updateMyJobs(newMyJob.uid, newMyJob);
    }

    return (<
        Container fluid >
        <
        div className="bg-white bg-opacity-10 ttr-rounded-15px mt-2 p-2" >
            <
        Form >
                <
        Row >
                    <
        Form.Group controlId="formBasicSelect"
                        as={Col} >
                        <
        Form.Label > Select Term < /Form.Label> <
        Form.Control as="select"
                                onChange={
                                    e => {
                                        setTerm(e.target.value);
                                    }
                                } >
                                {
                                    JOBS_TERMS.map(option => {
                                        return <option value={option} > {option} < /option>
            })
        } <
        /Form.Control> <
        /Form.Group> <
        Form.Group controlId="formBasicSelect"
                                                as={Col} >
                                                <
        Form.Label > Select Type < /Form.Label> <
        Form.Control as="select"
                                                        onChange={
                                                            e => {
                                                                setType(e.target.value);
                                                            }
                                                        } >
                                                        {
                                                            JOBS_TYPES.map(option => {
                                                                return <option value={option} > {option} < /option>
            })
        } <
        /Form.Control> <
        /Form.Group> <
        Form.Group as={Col} >
                                                                        <
        a href="#/jobs/new" >
                                                                            <
        Button className="button"
                                                                                type="button"
                                                                                class="btn" >
                                                                                New <
        /Button> <
        /a> <
        /Form.Group> <
        /Row> <
        /Form>

                                                                                <
        p > < /p>

                                                                                    <
        Table striped bordered hover >
                                                                                        <
        thead >
                                                                                            <
        tr >
                                                                                                <
        th > 公司 < /th> <
        th > Term < /th> <
        th > Type < /th> <
        th > 备注 < /th> <
        th > 推荐 < /th> <
        th > 上传 < /th> <
        th > 已投 < /th> <
        /tr> <
        /thead> <
        tbody > {
                                                                                                                                    displayJobs.map(job => {
                                                                                                                                        return (<
                    tr >
                                                                                                                                            <
                    td >
                                                                                                                                                <
                    Nav.Item >
                                                                                                                                                    <
                    Nav.Link href={job.link}
                                                                                                                                                        target="_blank" > {job.company} < /Nav.Link> <
                    /Nav.Item> <
                    /td> <
                    td > {job.term} < /td> <
                    td > {job.jobType} < /td> <
                    td > {job.comment} < /td> <
                    td > {job.recommendation} < /td> <
                    td > {job.author} < /td> <
                    td >
                                                                                                                                                                                <
                    div className="icons" >
                                                                                                                                                                                    <
                    span onClick={
                                                                                                                                                                                            () => toggleApply(job._id)} > {
                                                                                                                                                                                            myJobs.includes(job._id) ?
                                                                                                                                                                                                <
                        i className="fa-sharp fa-solid fa-file-check fa-2x"
                                                                                                                                                                                                    style={
                                                                                                                                                                                                        { color: 'red' }} > < /i> :
                                                                                                                                                                                                    <
                            i className="fa-sharp fa-light fa-file-check fa-2x" > < /i>
                    } <
                    /span> <
                    /div> <
                    /td> <
                                                                                                                                                                                                            td > < Nav.Link href={`#/jobs/edit/${job._id}`} > 编辑 < /Nav.Link></td >
                                                                                                                                                                                                        <
                    /tr>
                                                                                                                                                                                                        );
            })
        } <
        /tbody> <
        /Table> <
        /div> <
        /Container >
                                                                                                                                                                                                        )
}

                                                                                                                                                                                                        export default Jobs;