import React, { useState } from "react"

import { graphql } from 'gatsby'


import Layout from "../components/layout"
import SEO from "../components/seo"
import { Row, Col, ToggleButtonGroup, ToggleButton } from "react-bootstrap"
import { Result } from "antd"
import SelectionView from "../views/selection-view"


import "antd/es/result/style/index.css"

if (!Array.prototype.chunk) {
  Object.defineProperty(Array.prototype, 'chunk', {
    value: function (n) {
      return Array(Math.ceil(this.length / n)).fill().map((_, i) => this.slice(i * n, i * n + n));
    }
  });
}

const ToggleButtons = ({ groupings, selectedButton, setSelectedButton }) => {
  if (groupings.length > 1) {
    return (
      <Row className="justify-content-center">
        <ToggleButtonGroup name="test" value={selectedButton} onChange={setSelectedButton}>
          {groupings.map(grouping => (
            <ToggleButton variant="dark" key={grouping.id} value={grouping.meta.name}>{grouping.meta.display_name}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Row>
    )
  } else {
    return null
  }
}

const SelectionPage = ({ data }) => {

  const [selectedButton, setSelectedButton] = useState(data.allGrouping.nodes[0]?.meta.name);
  const grouping = data.allGrouping.nodes.find(grouping => selectedButton === grouping.meta.name);

  if (data.allGrouping.nodes.length === 0) {
    return (
      <Layout>
        <Result status="404" title="Could not find any groupings..." />
      </Layout>
    )
  }

  return (
    <>
      <SEO title="Practice by Category" />
      <Layout>
        <ToggleButtons groupings={data.allGrouping.nodes} selectedButton={selectedButton} setSelectedButton={setSelectedButton}/>
        <Row className="justify-content-center">
          <Col lg={6}>
            <SelectionView grouping={grouping} />
          </Col>
        </Row>
      </Layout>
    </>
  )
}

export const query = graphql`
    query Grouping {
        allGrouping {
            nodes {
              id
              results {
                display_name
                name
                elements
              }
              meta {
                display_name
                name
                unknown
                all
              }
            }
          }
    }
`

export default SelectionPage
