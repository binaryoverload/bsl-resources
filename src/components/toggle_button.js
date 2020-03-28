import React, { useState } from "react"
import PropTypes from "prop-types"

import "./toggle_button.css"

import { ToggleButton as BootstrapToggle } from "react-bootstrap"

const ToggleButton = ({ variant, value, children, name, className }) => {
    const [checked, setChecked] = useState(false)

    return (
        <BootstrapToggle
            type="checkbox"
            value={value}
            checked={checked}
            onChange={() => {
                setChecked(!checked)
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