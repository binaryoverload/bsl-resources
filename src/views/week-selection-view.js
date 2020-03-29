
import React, { useState } from "react"

import { displayFormat } from "../utils/title-case"

import { Button, Card, Nav } from "react-bootstrap"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignLanguage } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'gatsby'

import { WeekSelection, WeekSelectionButton} from "../components/WeekSelection"

const WeekSelectionView = ({ categories, onChange }) => {
    const [selectedCategories, setCategories] = useState([])

    return (
        <Card>
            <Card.Header>
                <Nav className="flex-column flex-sm-row px-2">
                    <Nav.Item className="mr-auto align-self-center w-75">
                        <h6 className="my-2">Choose the categories to practice</h6>
                        <p className="text-muted">Select multiple categories to practice or choose just one by clicking <FontAwesomeIcon icon={faSignLanguage} />!</p>
                    </Nav.Item>
                    <Nav.Item className="text-right align-sef-center">
                        <Link to={`/practice${selectedCategories.length > 0 ? `?week=${selectedCategories.join(",")}` : ''}`}><Button>Practice!</Button></Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body>
                <WeekSelection onChange={setCategories}>
                            {categories.map(week => (
                                <div key={week.id} className="d-flex flex-sm-row my-2">
                                    <WeekSelectionButton
                                        variant="info"
                                        name={week.name}
                                        className="flex-grow-1">
                                        {displayFormat(week.name)}
                                    </WeekSelectionButton>
                                    <Link to={`/practice?week=${week.name}`}>
                                        <Button className="ml-1"><span className="sr-only">Practice {week.name}</span><FontAwesomeIcon icon={faSignLanguage} /></Button>
                                    </Link>
                                </div>
                            ))}
                </WeekSelection>
            </Card.Body>
        </Card>
    )

}

export default WeekSelectionView;