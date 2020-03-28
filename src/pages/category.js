import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from 'gatsby'
import ToggleButton from "../components/toggle_button"
import { Row, Col, Button, Card, Nav } from "react-bootstrap"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignLanguage } from '@fortawesome/free-solid-svg-icons'

const CategoryButton = ({ category }) => (
    <ToggleButton variant="info" value={category} className="flex-grow-1">{category}</ToggleButton>
)

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
                                    <Nav.Item className="mr-auto align-self-center">
                                        <h6 className="my-2">Choose the categories to practice</h6>
                                    </Nav.Item>
                                    <Nav.Item className="text-right">
                                        <Button>Practice! <FontAwesomeIcon icon={faSignLanguage}/></Button>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body>

                                <Card.Title></Card.Title>
                                {data.allCategory.nodes.map(category => {
                                return (<div className="d-flex flex-sm-row my-2">
                                    <CategoryButton key={category.id} category={category.name} />
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
