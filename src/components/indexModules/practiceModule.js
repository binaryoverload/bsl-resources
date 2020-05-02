import React from "react"

import { Card, Button } from "react-bootstrap"

const PracticeModule = () => (
    <Card className="my-1">
        <Card.Body style={{minHeight: "15rem"}}>
            <Card.Title>Sign practice</Card.Title>
            <Card.Text>
                Practice sign using the words from the sessions. Each sign comes with a hint to help you remember it as well as a video.
                <br /><br />
                Signs are grouped per category and per-week to help you practice specific topics or signs from a specific session.
              </Card.Text>
            <div className="d-flex justify-content-center mt-auto">
                <Button className="mr-2" href="/selection">Select signs to practice</Button>
                <Button variant="dark" href="/practice">Practice Everything</Button>
            </div>
        </Card.Body>
    </Card>
)

export default PracticeModule