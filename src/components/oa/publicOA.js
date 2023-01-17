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
import AddOA from "./addOA.js";
import DisplayOA from "./display.js";

function PublicOA({ user }) {

    const [allLeetcodes, setAll] = useState([]);
    const [display, setDisplay] = useState([]);
    const [name, setName] = useState("");

    useEffect(async () => {
        leetcodeService.findAllLeetcodes()
            .then(all => {
                let allLeetcodes = [];
                for (let each of all) {
                    if (each.oa) {
                        allLeetcodes.push(each);
                    }
                }
                allLeetcodes = allLeetcodes.reverse();
                setDisplay(allLeetcodes);
                setAll(allLeetcodes);
                console.log(allLeetcodes);
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

    return (
        <DisplayOA display={display} setName={setName} />
    )
}

export default PublicOA;