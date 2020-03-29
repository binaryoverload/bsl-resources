import React from "react"

import { Card, Button } from "react-bootstrap"

const DictionaryModule = () => (
    <Card className="my-1">
        <Card.Body>
            <Card.Title>Sign dictionaries</Card.Title>
            <p>Here you can find some sign dictionaries to help you find a more obscure word!</p>
            <Button href="https://www.signbsl.com/"><img className="align-self-center" src="https://www.signbsl.com/logo.svg" style={{ height: "1.5em" }} /> SignBSL</Button>{' '}
            <Button href="https://spreadthesign.com"><img src="https://www.spreadthesign.com/static/img/favicon.ico" style={{ height: "1em" }} /> SpreadTheSign</Button>
        </Card.Body>
    </Card>
)

export default DictionaryModule