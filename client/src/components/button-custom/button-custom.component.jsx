import React from 'react';
import './button-custom.styles.css';

const CustomButton = ({ children,blueBtn, redBtn, yellowBtn,...otherProps}) => {

    return (<div>
        <button
            className={`
            customBtn
        ${blueBtn ? 'blueBtn' : ''}
        ${redBtn ? 'redBtn' : ''}
        ${yellowBtn ? 'yelloeBtn' : ''}
        `}
            {...otherProps}
        >
            {children}
        </button>
    </div>)
}
export default CustomButton;