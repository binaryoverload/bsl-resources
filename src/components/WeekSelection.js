import React, { useReducer, useContext, useEffect } from 'react'
import { ToggleButton as BootstrapToggle } from "react-bootstrap"

export const WeekSelectionContext = React.createContext()

const initialState = {
    selectedCategories: []
}

function reducer(state, action) {
    switch(action.type) {
        case "TOGGLE_WEEK":
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

export const WeekSelection = ({onChange, children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        onChange(state.selectedCategories)
    }, [state.selectedCategories, onChange])

    return (
        <WeekSelectionContext.Provider value={[state, dispatch]}>
            {children}
        </WeekSelectionContext.Provider>
    )
}

export const WeekSelectionButton = ({ variant, value, children, name, className }) => {
    const [state, dispatch] = useContext(WeekSelectionContext)

    return (
        <BootstrapToggle
            type="checkbox"
            value={value}
            checked={state.selectedCategories.includes(name)}
            onChange={() => {
                dispatch({
                    type: "TOGGLE_WEEK",
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