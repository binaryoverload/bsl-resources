import React, { useReducer, useContext, useEffect } from 'react'
import { ToggleButton as BootstrapToggle } from "react-bootstrap"

export const CategorySelectionContext = React.createContext()

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

export const CategorySelection = ({onChange, children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        onChange(state.selectedCategories)
    }, [state.selectedCategories, onChange])

    return (
        <CategorySelectionContext.Provider value={[state, dispatch]}>
            {children}
        </CategorySelectionContext.Provider>
    )
}

export const CategorySelectionButton = ({ variant, value, children, name, className }) => {
    const [state, dispatch] = useContext(CategorySelectionContext)

    return (
        <BootstrapToggle
            type="checkbox"
            value={value}
            checked={state.selectedCategories.includes(name)}
            onChange={() => {
                dispatch({
                    type: "TOGGLE_CATEGORY",
                    category: name
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