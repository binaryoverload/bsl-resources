import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from 'gatsby'
import ToggleButton from "../components/toggle_button"
import { Row, Col, Button } from "react-bootstrap"

const CategoryButton = ({ category }) => (
        <ToggleButton value={category}>{category}</ToggleButton>
    )

const CategoryPage = ({ data }) => {

    return (
        <>
            <SEO title="Practice by Category" />
            <Layout>
                    {data.allCategory.nodes.map(category => <CategoryButton key={category.id} category={category.category} />)}
            </Layout>
        </>
    )
}

export const query = graphql`
    query Categories {
        allCategory {
            nodes {
            signs {
                hint
                sign
                video_url
            }
            category
            id
            }
        }
    }
`

export default CategoryPage
