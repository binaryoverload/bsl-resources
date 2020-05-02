import React from "react"

import { Link } from "gatsby"
import { Card, Button } from "react-bootstrap"

const DictionaryModule = () => (
    <Card className="my-1">
        <Card.Body style={{minHeight: "15rem"}}>
            <Card.Title>Sign dictionaries</Card.Title>
            <p>Here you can find some sign dictionaries to help you find a more obscure word!</p>
            <p>If we don't have a word in our database, please consider <Link to="/contact">contacting us</Link> and we will be sure to add it!</p>
            <div className="d-flex justify-content-center mt-auto">
                <Button className="mr-2" href="https://www.signbsl.com/"><img className="align-self-center" alt="Sign BSL Logo" src="https://www.signbsl.com/logo.svg" style={{ height: "1.5em" }} /> SignBSL</Button>{' '}
                <Button href="https://spreadthesign.com"><img alt="Spread The Sign Logo" src="https://www.spreadthesign.com/static/img/favicon.ico" style={{ height: "1em" }} /> SpreadTheSign</Button>
            </div>
        </Card.Body>
    </Card>
)

export default DictionaryModule