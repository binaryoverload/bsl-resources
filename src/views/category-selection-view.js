
import React, { useState } from "react"

import { displayFormat } from "../utils/title-case"

import { Button, Card, Nav } from "react-bootstrap"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignLanguage } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'gatsby'

import { CategorySelection, CategorySelectionButton } from "../components/CategorySelection"

const CategorySelectionView = ({ categories, onChange }) => {
    const [selectedCategories, setCategories] = useState([])

    const sortByCategory = (category1, category2) => {
        if (category1.name > category2.name) return 1;
        if (category1.name < category2.name) return -1;

        return 0;
    }

    return (
        <Card>
            <Card.Header>
                <Nav className="flex-column flex-sm-row px-2">
                    <Nav.Item className="mr-auto align-self-center w-75">
                        <h6 className="my-2">Choose the categories to practice</h6>
                        <p className="text-muted">Select multiple categories to practice or choose just one by clicking <FontAwesomeIcon icon={faSignLanguage} />!</p>
                    </Nav.Item>
                    <Nav.Item className="text-right align-sef-center">
                        <Link to={`/practice${selectedCategories.length > 0 ? `?category=${selectedCategories.join(",")}` : ''}`}><Button>Practice!</Button></Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body>
                <CategorySelection onChange={setCategories}>
                    {categories.sort(sortByCategory).map(category => (
                        <div key={category.id} className="d-flex flex-sm-row my-2">
                            <CategorySelectionButton
                                variant="info"
                                name={category.name}
                                className="flex-grow-1">
                                {displayFormat(category.name)}
                            </CategorySelectionButton>
                            <Link to={`/practice?category=${category.name}`}>
                                <Button className="ml-1"><span className="sr-only">Practice {category.name}</span><FontAwesomeIcon icon={faSignLanguage} /></Button>
                            </Link>
                        </div>
                    ))}
                </CategorySelection>
            </Card.Body>
        </Card>
    )

}

export default CategorySelectionView;