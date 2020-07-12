import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

const EmailLink = ({ children, className }) => (
    <a className={`${className ? className : ""} text-nowrap`} href={`mailto:${children}`}><FontAwesomeIcon icon={faEnvelope} /> {children}</a>
)

export default EmailLink