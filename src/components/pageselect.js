import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faDotCircle } from '@fortawesome/free-regular-svg-icons'

const PageSelect = ({current, size, callback}) => {

    const dots = []

    if (size <= 1) return null

    for (let i = 0; i < size; i++) {
        if (i == current) {
            dots.push(
                <a href="#" style={{ margin: "0 0.1em" }} key={i} onClick={() => callback(i)}><FontAwesomeIcon icon={faDotCircle}/></a>
            )
        } else {
            dots.push(
                <a href="#" style={{ margin: "0 0.1em" }} key={i} onClick={() => callback(i)}><FontAwesomeIcon icon={faCircle}/></a>
            ) 
        }
    }

    return <div style={{ margin: "0.5em 0"}}>
        {dots}
    </div>
}

export default PageSelect