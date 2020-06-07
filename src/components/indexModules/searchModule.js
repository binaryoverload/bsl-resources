import React, { useState } from "react"
import {useStaticQuery, graphql} from "gatsby"
import Autosuggest from 'react-autosuggest';

import { Card, Button, Form } from "react-bootstrap"


const PracticeModule = () => {

    const [value, setValue] = useState("")
    const [suggestions, setSuggestions] = useState([])

    const data = useStaticQuery(graphql`
        query SearchSigns {
            allSign {
                nodes {
                    sign
                    display_name
                }
            }
        }
    `).allSign.nodes

    const onChange = (event, { newValue }) => {
        setValue(newValue)
    }

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value))
    }

    const onSuggestionsClearRequested = () => {
        setSuggestions([])
    }

    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase()
        const inputLength = inputValue.length
    
        return inputLength === 0 ? [] : data.filter(sign =>
            sign.display_name.toLowerCase().slice(0, inputLength) === inputValue
        ).slice(0, 10)
    }
    
    const getSuggestionValue = sign => sign.display_name
    
    // https://codepen.io/moroshko/details/RGPjNk

    const renderSuggestion = (suggestion, {query}) => (
        <div>
            <span className="text-primary">{query}</span>{suggestion.display_name.slice(query.length)}
        </div>
    )

    const inputProps = {
        placeholder: 'Type a sign',
        value,
        onChange
    };

    return (
        <Card className="my-1">
            <Card.Body style={{ minHeight: "15rem" }}>
                <Card.Title>Search for a sign!</Card.Title>
                <Card.Text>
                    Search for a specific sign in our sign library.
            </Card.Text>
                <div className="d-flex justify-content-center mt-auto">
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderInputComponent={inputProps => (
                            <Form.Control {...inputProps}></Form.Control>
                        )}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                    />
                </div>
            </Card.Body>
        </Card>
    )
}

export default PracticeModule