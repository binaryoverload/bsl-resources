
import React, { useState } from "react"

import { Button, Card, Nav } from "react-bootstrap"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignLanguage } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'gatsby'

import { Selection, SelectionButton } from "../components/Selection"

const SelectionView = ({ grouping, onChange }) => {
    const [selectedGroups, setSelectedGroups] = useState([])

    const sortByName = (a, b) => {
        if (a.name > a.name) return 1;
        if (a.name < b.name) return -1;

        return 0;
    }

    return (
        <Card>
            <Card.Header>
                <Nav className="flex-column flex-sm-row px-2">
                    <Nav.Item className="mr-auto align-self-center w-75">
                        <h6 className="my-2">Choose the {grouping.meta.display_name.toLower()} to practice</h6>
                        <p className="text-muted">Select multiple {grouping.meta.display_name.toLower()} to practice or choose just one by clicking <FontAwesomeIcon icon={faSignLanguage} />!</p>
                    </Nav.Item>
                    <Nav.Item className="text-right align-sef-center">
                        <Link to={`/practice${selectedGroups.length > 0 ? `?${grouping.meta.name}=${selectedGroups.join(",")}` : ''}`}>
                            <Button>Practice!</Button> {/* TODO:  Dynamic button? */}
                        </Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body>
                <Selection onChange={setSelectedGroups} groupingKey={grouping.meta.name}>
                    {grouping.results.sort(sortByName).map(group => (
                        <div key={group.id} className="d-flex flex-sm-row my-2">
                            <SelectionButton
                                variant="info"
                                name={group.name}
                                groupingKey={grouping.meta.name}
                                className="flex-grow-1">
                                {group.display_name}
                            </SelectionButton>
                            <Link to={`/practice?${grouping.meta.name}=${group.name}`}>
                                <Button className="ml-1"><span className="sr-only">Practice {group.name}</span><FontAwesomeIcon icon={faSignLanguage} /></Button>
                            </Link>
                        </div>
                    ))}
                </Selection>
            </Card.Body>
        </Card>
    )

}

export default SelectionView;