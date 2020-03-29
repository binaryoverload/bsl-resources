import React from "react"

import SEO from "../components/seo"
import Layout from "../components/layout"
import { Row, Col, Button, Card } from "react-bootstrap"

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <Layout>
      <Row>
        <Col lg={6}>
          <Card border="primary">
            <Card.Body>
              <Card.Title>Sign practice</Card.Title>
              <Card.Text>
                Practice sign using the words from the sessions. Each sign comes with a hint to help you remember it as well as a video.
                <br /><br />
                Signs are grouped per category and per-week to help you practice specific topics or signs from a specific session.
              </Card.Text>
              <div className="d-flex justify-content-around">
                <Button className="mr-1" href="/category">Practice by category</Button>{' '}
                <Button className="mx-1" href="/week">Practice by Week</Button>{' '}
                <Button className="ml-1" variant="dark" href="/practice">Practice Everything</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  </>
)

export default IndexPage
