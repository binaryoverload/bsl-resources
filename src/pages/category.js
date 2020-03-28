import React from "react"

import { graphql } from 'gatsby'


import Layout from "../components/layout"
import SEO from "../components/seo"
import { Row, Col, Button, Card, Nav } from "react-bootstrap"
import CategorySelection from "../views/category-selection"

const CategoryPage = ({ data }) => {

    return (
        <>
            <SEO title="Practice by Category" />
            <Layout>
                <Row className="justify-content-center">
                    <Col lg={6}>
                        <CategorySelection categories={data.allCategory.nodes}/>
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
