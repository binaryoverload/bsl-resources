import React from "react"

import { graphql } from 'gatsby'


import Layout from "../components/layout"
import SEO from "../components/seo"
import { Row, Col } from "react-bootstrap"
import SelectionView from "../views/selection-view"

Object.defineProperty(Array.prototype, 'chunk', {value: function(n) {
  return Array(Math.ceil(this.length/n)).fill().map((_,i) => this.slice(i*n,i*n+n));
}});

const SelectionPage = ({ data }) => {
    return (
        <>
            <SEO title="Practice by Category" />
            <Layout>

                {data.allGrouping.nodes.chunk(2).map(groupings => (
                  <Row className="justify-content-center">
                    {
                      groupings.map(group => (
                        <Col lg={6}>
                            <SelectionView grouping={group}/>
                        </Col>
                      ))
                    }
                  </Row>
                ))}
            </Layout>
        </>
    )
}

export const query = graphql`
    query Grouping {
        allGrouping {
            nodes {
              results {
                display_name
                name
              }
              meta {
                display_name
                name
                unknown
              }
            }
          }
    }
`

export default SelectionPage
