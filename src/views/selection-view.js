
import React, { useState, useEffect } from "react"

import { Button, Card, Nav, Form } from "react-bootstrap"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignLanguage } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'gatsby'

import { Selection, SelectionButton } from "../components/Selection"

const sortByDisplayName = (a, b) => {
    if (a.display_name > b.display_name) return 1;
    if (a.display_name < b.display_name) return -1;

    return 0;
}

const SelectionView = ({ grouping, onChange }) => {
    const [selectedGroups, setSelectedGroups] = useState([])
    const [filter, setFilter] = useState("")
    const [data, setData] = useState(grouping.data.sort(sortByDisplayName))

    useEffect(() => {
        setData(grouping.data.sort(sortByDisplayName).filter((grouping) => !filter || grouping.display_name.toLowerCase().includes(filter.toLowerCase())))
    }, [filter, grouping.data])

    let practiceButtonText = selectedGroups.length === 0 ?
                                grouping.all :
                                `${grouping.data.filter(result => selectedGroups.includes(result.name)).flatMap(result => result.signs).length} Signs`

    return (
        <Card className="my-3">
            <Card.Header className="sticky-top pb-3" style={{backgroundColor: "#FFF"}}>
                <Nav className="d-flex flex-md-row flex-column mb-3 flex-nowrap">
                    <Nav.Item id="selection-header" className="mr-auto">
                        <h6 className="my-2">Choose the {grouping.display_name.toLowerCase()} to practice</h6>
                        <p className="text-muted m-0">Select multiple {grouping.display_name.toLowerCase()} to practice or choose just one by clicking <FontAwesomeIcon icon={faSignLanguage} />!</p>
                    </Nav.Item>
                    <Nav.Item id="selection-button" className="align-self-center flex-shrink-0">
                        <Link to={`/practice${selectedGroups.length > 0 ? `?${grouping.name}=${selectedGroups.join(",")}` : ''}`}>
                            <Button>Practice {practiceButtonText}!</Button>
                        </Link>
                    </Nav.Item>
                </Nav>
                <Form.Control onChange={(value) => setFilter(value.target.value)} placeholder="Filter" type="search"></Form.Control>
            </Card.Header>
            <Card.Body>
                <Selection onChange={setSelectedGroups} groupingKey={grouping.name}>
                    {data.map(group => (
                        <div key={group.name} className="d-flex flex-row my-2">
                            <SelectionButton
                                variant="outline-secondary"
                                name={group.name}
                                groupingKey={grouping.name}
                                className="flex-grow-1">
                                {group.display_name}
                            </SelectionButton>
                            <Link to={`/practice?${grouping.name}=${group.name}`}>
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