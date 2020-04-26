import React, { useReducer, useContext, useEffect } from 'react'
import { ToggleButton as BootstrapToggle } from "react-bootstrap"

import "./toggle-button.css"

const initialState = {
    selected: []
}

const contexts = {}

function reducer(state, action) {
    switch(action.type) {
        case "TOGGLE":
            if (state.selected.includes(action.element)) {
                const selected = [...state.selected]
                selected.splice(selected.indexOf(action.element), 1)
                return {...state, selected}
            }
            return {...state, selected: [...state.selected, action.element]}
        default:
            return state
    }
} 

export const Selection = ({onChange, children, groupingKey}) => {
    const context = contexts[groupingKey] || (contexts[groupingKey] = React.createContext())
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        onChange(state.selected)
    }, [state.selected, onChange])

    return (
        <context.Provider value={[state, dispatch]}>
            {children}
        </context.Provider>
    )
}

export const SelectionButton = ({ variant, value, children, name, className, groupingKey }) => {
    const [state, dispatch] = useContext(contexts[groupingKey] || (contexts[groupingKey] = React.createContext()))

    return (
        <BootstrapToggle
            type="checkbox"
            value={value}
            checked={state.selected.includes(name)}
            onChange={() => {
                dispatch({
                    type: "TOGGLE",
                    element: name
                })
            }}
            name={name}
            className={`toggle-button m-0 ${className}`}
            variant={variant}
            >
            {children}
        </BootstrapToggle>
    )
}