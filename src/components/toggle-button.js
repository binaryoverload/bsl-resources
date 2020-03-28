import React, { useContext } from "react"
import PropTypes from "prop-types"

import "./toggle-button.css"

import { ToggleButton as BootstrapToggle } from "react-bootstrap"

import { CategorySelectionContext } from "./contexts"

const ToggleButton = ({ variant, value, children, name, className }) => {
    const [state, dispatch] = useContext(CategorySelectionContext)
    return (
        <BootstrapToggle
            type="checkbox"
            value={value}
            checked={state.selectedCategories.includes(name)}
            onChange={() => {
                // setChecked(!checked)
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

ToggleButton.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.string,
    name: PropTypes.string
}

export default ToggleButton