import React from "react"

import SEO from "../components/seo"
import Layout from "../components/layout"
import { Row, Col, Button } from "react-bootstrap"

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <Layout>
      <Row>
        <Col>
          <h1>BSL Practice</h1>
        </Col>
      </Row>
      <Button href="/category">Practice by category</Button>{' '}
      <Button href="/week">Practice by Week</Button>
    </Layout>
  </>
)

export default IndexPage
