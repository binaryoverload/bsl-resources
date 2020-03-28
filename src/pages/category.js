import React from "react"

import { graphql } from 'gatsby'

import { titleCase } from "../utils/title-case"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ToggleButton from "../components/toggle-button"
import { Row, Col, Button, Card, Nav } from "react-bootstrap"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignLanguage } from '@fortawesome/free-solid-svg-icons'

const CategoryPage = ({ data }) => {
    return (
        <>
            <SEO title="Practice by Category" />
            <Layout>
                <Row className="justify-content-center">
                    <Col lg={6}>
                        <Card>
                            <Card.Header>
                                <Nav className="flex-column flex-sm-row px-2">
                                    <Nav.Item className="mr-auto align-self-center w-75">
                                        <h6 className="my-2">Choose the categories to practice</h6>
                                        <p className="text-muted">Select multiple categories to practice or choose just one by clicking <FontAwesomeIcon icon={faSignLanguage}/>!</p>
                                    </Nav.Item>
                                    <Nav.Item className="text-right align-self-center">
                                        <Button>Practice!</Button>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body>

                                <Card.Title></Card.Title>
                                {data.allCategory.nodes.map(category => {
                                return (<div className="d-flex flex-sm-row my-2">
                                    <ToggleButton 
                                        variant="info" 
                                        value={category.FontAwesomeIcon} 
                                        className="flex-grow-1"
                                        key={category}>
                                            {titleCase(category.name)}
                                    </ToggleButton>
                                    <Button className="ml-1"><FontAwesomeIcon icon={faSignLanguage}/></Button>
                                </div>)
                                })}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Layout>
        </>
    )
}

export const query = graphql`
    query Categories {
        allCategory {
            nodes {
                name
                signs {
                    hint
                    sign
                    video_url
                }
            }
        }
    }
`

export default CategoryPage
