import React from "react";
import { Container } from "react-bootstrap";
import rankList from "./rank.json";

function Rank() {

    const d = new Date().toLocaleDateString();
    return (
        <Container>
            <div className="bg-primary bg-opacity-10 ttr-rounded-15px mt-2 p-2">
                <h2>今日刷题榜</h2>
                {
                    rankList.map(user => {
                        return (
                            <div key={user._id} className="ttr-whats-happening-tuit d-flex mb-3">
                                <div className="flex-grow-1">
                                    <h3 className="fs-6 fw-lighter">
                                        {user.name} - {user['hours-ago']} {d} </h3>
                                    <div className="fw-bold mb-2 pe-1">
                                        {user.today_leetcode}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </Container>
    )
}

export default Rank;