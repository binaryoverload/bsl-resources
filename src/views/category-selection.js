
import React from "react"

import { titleCase } from "../utils/title-case"

import { Button, Card, Nav } from "react-bootstrap"
import ToggleButton from "../components/toggle-button"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignLanguage } from '@fortawesome/free-solid-svg-icons'

const CategorySelection = ({ categories, changeCallback }) => {

    return (
        <Card>
            <Card.Header>
                <Nav className="flex-column flex-sm-row px-2">
                    <Nav.Item className="mr-auto align-self-center w-75">
                        <h6 className="my-2">Choose the categories to practice</h6>
                        <p className="text-muted">Select multiple categories to practice or choose just one by clicking <FontAwesomeIcon icon={faSignLanguage} />!</p>
                    </Nav.Item>
                    <Nav.Item className="text-right align-self-center">
                        <Button>Practice!</Button>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body>
                {categories.map((category, index) => {
                    return (<div className="d-flex flex-sm-row my-2">
                        <ToggleButton
                            variant="info"
                            name={category.name}
                            className="flex-grow-1"
                            key={index}>
                            {titleCase(category.name)}
                        </ToggleButton>
                        <Button className="ml-1"><FontAwesomeIcon icon={faSignLanguage} /></Button>
                    </div>)
                })}
            </Card.Body>
        </Card>
    )

}

export default CategorySelection;