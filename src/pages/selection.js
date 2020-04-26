import React, { useState } from "react"

import { graphql } from 'gatsby'


import Layout from "../components/layout"
import SEO from "../components/seo"
import { Row, Col, ToggleButtonGroup, ToggleButton } from "react-bootstrap"
import SelectionView from "../views/selection-view"

if (!Array.prototype.chunk) {
  Object.defineProperty(Array.prototype, 'chunk', {
    value: function (n) {
      return Array(Math.ceil(this.length / n)).fill().map((_, i) => this.slice(i * n, i * n + n));
    }
  });
}

const SelectionPage = ({ data }) => {

  const [selectedButton, setSelectedButton] = useState(data.allGrouping.nodes[0]?.meta.name);
  const grouping = data.allGrouping.nodes.find(grouping => selectedButton === grouping.meta.name);

  return (
    <>
      <SEO title="Practice by Category" />
      <Layout>
        <Row className="justify-content-center">
          <ToggleButtonGroup name="test" value={selectedButton} onChange={setSelectedButton}>
            {data.allGrouping.nodes.map(grouping => (
              <ToggleButton variant="dark" key={grouping.id} value={grouping.meta.name}>{grouping.meta.display_name}</ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Row>
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
