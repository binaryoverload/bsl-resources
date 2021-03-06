import React from "react"

import SEO from "../components/seo"
import Layout from "../components/layout"
import { Row, Col } from "react-bootstrap"

import Practice from "../components/indexModules/practiceModule"
import Dictionary from "../components/indexModules/dictionaryModule"

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <Layout className="pt-3">
      <Row>
        <Col lg={6}>
          <Practice/>
        </Col>
        <Col lg={6}>
          <Dictionary/>
        </Col>
      </Row>
    </Layout>
  </>
)

export default IndexPage
