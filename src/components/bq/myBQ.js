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
import DisplayBQ from "./displayBQ.js";

function MyBQ({ user }) {

    const [allLeetcodes, setAll] = useState([]);
    const [display, setDisplay] = useState([]);
    const [name, setName] = useState("");
    const [tag, setTag] = useState("");

    useEffect(async () => {
        leetcodeService.findAllLeetcodes()
            .then(all => {
                solutionsService.findAllSolutions()
                    .then((solutions) => {
                        const allLeetcodes = [];
                        for (let each of all) {
                            if (each.bq) {
                                for (let sol of solutions) {
                                    if (sol.leetcode_id === each.leetcode_id && sol.uid === user.googleId) {
                                        each.date = sol.date;
                                        allLeetcodes.push(each);
                                    }
                                }
                            }
                        }
                        allLeetcodes.sort((a, b) => {
                            return Date.parse(b.date) - Date.parse(a.date);
                        });
                        setDisplay(allLeetcodes);
                        setAll(allLeetcodes);
                    });
            })
    }, [])

    useEffect(() => {
        const tagLeetcodes = [];
        for (let problem of allLeetcodes) {
            if (problem.name.toLowerCase().includes(name.toLowerCase())) {
                tagLeetcodes.push(problem);
            }
        }
        if (name === "") {
            setDisplay(allLeetcodes);
        } else {
            setDisplay(tagLeetcodes);
        }
    }, [name, setName])

    useEffect(() => {
        if (tag === 'All' || tag === "-") {
            setDisplay(allLeetcodes);
        } else {
            const tagLeetcodes = [];
            for (let problem of allLeetcodes) {
                for (let tagOfProblem of problem.tags) {
                    if (tagOfProblem === tag) {
                        tagLeetcodes.push(problem);
                    }
                }
            }
            setDisplay(tagLeetcodes);
        }
    }, [tag])


    return (
        <DisplayBQ display={display} setName={setName} setTag={setTag} />
    )
}

export default MyBQ;