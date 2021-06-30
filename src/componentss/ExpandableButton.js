import React from 'react'
import {FaPlus, FaMinus} from 'react-icons/fa'

const ExpandableButton = ({onDisplay, showGrades}) => {
    return(
        <button
            className="btn"
            onClick={onDisplay}
        >
            {showGrades ? <FaMinus /> : <FaPlus />}
        </button>
    )
}
export default ExpandableButton