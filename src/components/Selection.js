import React, { useReducer, useContext, useEffect } from 'react'
import { ToggleButton as BootstrapToggle } from "react-bootstrap"

import "./toggle-button.css"

const initialState = {
    selectedCategories: []
}

function reducer(state, action) {
    switch(action.type) {
        case "TOGGLE":
            if (state.selectedCategories.includes(action.week)) {
                const selectedCategories = [...state.selectedCategories]
                selectedCategories.splice(selectedCategories.indexOf(action.week), 1)
                return {...state, selectedCategories}
            }
            return {...state, selectedCategories: [...state.selectedCategories, action.week]}
        default:
            return state
    }
} 

export const Selection = ({onChange, children, context}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        onChange(state.selectedCategories)
    }, [state.selectedCategories, onChange])

    return (
        <context.Provider value={[state, dispatch]}>
            {children}
        </context.Provider>
    )
}

export const SelectionButton = ({ variant, value, children, name, className, context }) => {
    const [state, dispatch] = useContext(context)

    return (
        <BootstrapToggle
            type="checkbox"
            value={value}
            checked={state.selectedCategories.includes(name)}
            onChange={() => {
                dispatch({
                    type: "TOGGLE",
                    week: name
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