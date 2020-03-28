import React from "react"

import { graphql } from 'gatsby'


import "../components/toggle-button.css"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Row, Col } from "react-bootstrap"
import WeekSelection from "../views/week-selection-view"

const WeekPage = ({ data }) => {

    return (
        <>
            <SEO title="Practice by Week" />
            <Layout>
                <Row className="justify-content-center">
                    <Col lg={6}>
                            <WeekSelection categories={data.allWeek.nodes}/>
                    </Col>
                </Row>
            </Layout>
        </>
    )
}

export const query = graphql`
    query Weeks {
        allWeek {
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

export default WeekPage
