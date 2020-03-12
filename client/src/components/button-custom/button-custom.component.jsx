import React from 'react';
import './button-custom.styles.css';

const CustomButton = ({ children,blueBtn, redBtn, yellowBtn,...otherProps}) => {

    return (<div>
        <button
            className={`
            btn            
            btn-sm-block
            btn-xs-block
            customBtn
        ${blueBtn ? 'blueBtn ' : ''}
        ${redBtn ? 'redBtn' : ''}
        ${yellowBtn ? 'yellowBtn' : ''}
        `}
            {...otherProps}
        >
            {children}
        </button>
    </div>)
}
export default CustomButton;