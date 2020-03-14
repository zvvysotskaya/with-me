import React from 'react';

const ButtonCommentsHideTextArea = ({ hideTextArea }) => {
    function hide(e) {
        e.preventDefault()
        hideTextArea()
    }
    return (
        <div>
            <button onClick={hide}>Hide Text Area</button>
        </div>
        )
}
export default ButtonCommentsHideTextArea;