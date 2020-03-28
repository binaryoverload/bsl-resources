import React, { useReducer } from "react"

import { graphql } from 'gatsby'


import Layout from "../components/layout"
import SEO from "../components/seo"
import { Row, Col, Button, Card, Nav } from "react-bootstrap"
import CategorySelection from "../views/category-selection"

import { CategorySelectionContext } from "../components/contexts"

const initialState = {
    selectedCategories: []
}

function reducer(state, action) {
    switch(action.type) {
        case "TOGGLE_CATEGORY":
            if (state.selectedCategories.includes(action.category)) {
                const selectedCategories = [...state.selectedCategories]
                selectedCategories.splice(selectedCategories.indexOf(action.category), 1)
                return {...state, selectedCategories}
            }
            return {...state, selectedCategories: [...state.selectedCategories, action.category]}
        default:
            return state
    }
} 

const CategoryPage = ({ data }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <>
            <SEO title="Practice by Category" />
            <Layout>
                <Row className="justify-content-center">
                    <Col lg={6}>
                        <CategorySelectionContext.Provider value={[state, dispatch]}>
                            <CategorySelection categories={data.allCategory.nodes}/>
                        </CategorySelectionContext.Provider>
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
