import React from "react";
import Select from 'react-select';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from 'react-bootstrap/Form';
import { useCallback, useState, useEffect } from "react";
import { LEETCODE_TAGS } from "../../context.js";
import { Link, useLocation, useParams } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import * as solutionsServices from "../../services/solutions-service";
import * as leetcodeService from "../../services/leetcodes-service";
import "./styles.css";
import Highlight from 'react-highlight';


function SingleLeetcode({ user }) {
    const { lid } = useParams();
    const userId = user.googleId;
    const [leetcode, setLeetcode] = useState({});
    const [mySolution, setMine] = useState({});
    const [otherSolutions, setOthers] = useState([]);

    useEffect(() => {
        leetcodeService.findLeetcodesByID(lid)
            .then(problem => setLeetcode(problem[0]));

        solutionsServices.findSolutionsByLid(lid)
            .then(solutions => {
                // console.log(solutions);
                const othersArr = [];
                solutions.map(
                    sol => {
                        if (sol.uid === userId) {
                            setMine(sol);
                        } else {
                            othersArr.push(sol);
                        }
                    }
                )
                setOthers(othersArr);
            });
    }, []);

    return (

        <Container fluid>
            <Form>
                <div className="bg-white bg-opacity-10 ttr-rounded-15px mt-2 p-2">
                    <a href={leetcode.link} target="_blank">
                        <Button variant="warning">
                            Go To Leetcode
                        </Button>
                    </a>
                    <p></p>
                    <Table>
                        <thead>
                            <tr>
                                <th>题号</th>
                                <th>题目</th>
                                <th>简介</th>
                            </tr>
                            <tr>
                                <th>{lid}</th>
                                <th>{leetcode.name}</th>
                                <td>{leetcode.intro}</td>
                            </tr>
                        </thead>
                    </Table>
                    <Row>
                        <Card >
                            <div className="content" style={{ whiteSpace: "pre-wrap" }}>
                                <Card.Body>
                                    <Card.Subtitle className="mb-2 text-muted">我的答案<br /><br /></Card.Subtitle>
                                    <Card.Text className="important">{mySolution.shortAnswer} </Card.Text>
                                    <Card.Text>
                                        {mySolution.longAnswer}
                                    </Card.Text>
                                    <br></br>
                                    {mySolution.code &&
                                        <Card.Text>
                                            <Highlight language="java">{mySolution.code}</Highlight>
                                        </Card.Text>
                                    }
                                </Card.Body>
                            </div>
                        </Card>
                    </Row>
                    <Row>
                        <div>
                            <p></p>
                            <Link to={"/leetcodes/" + leetcode.leetcode_id + "/addsolution"} state={{ solution: mySolution, problem: leetcode }}>
                                <Button variant="danger">
                                    Add/Edit My Solution
                                </Button>
                            </Link>

                        </div>
                    </Row>
                    <p></p>
                    <p></p>
                    <p></p>
                    {
                        otherSolutions.map(sol => {
                            return (
                                <Row>
                                    <Card >
                                        <div className="content" style={{ whiteSpace: "pre-wrap" }}>
                                            <Card.Body>
                                                <Card.Subtitle className="mb-2 text-muted">User: {sol.username} </Card.Subtitle>
                                                <Card.Text className="important">{sol.shortAnswer}</Card.Text>

                                                <Card.Text>
                                                    {sol.longAnswer}
                                                </Card.Text>
                                                <br></br>
                                                {sol.code &&
                                                    <Card.Text>
                                                        <Highlight language="java">{sol.code}</Highlight>
                                                    </Card.Text>
                                                }
                                            </Card.Body>
                                        </div>
                                    </Card>
                                </Row>
                            );
                        })
                    }
                </div>
            </Form >
        </Container >
    )

}

export default SingleLeetcode;