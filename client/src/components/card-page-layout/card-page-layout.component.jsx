import React from 'react'
import './card-page-layout.styles.css'

const CardPageLayout = ({ bgLightGray, bgLightBlue, children, ...props }) => (
    <div className={`
        container 
        card_page_layout 
        bgWhite
        ${bgLightGray ? 'bgLightGray' : ''}
        ${bgLightBlue ? 'bgLightBlue' : ''}
        `}{...props}>
                {children}
    </div>
)
export default CardPageLayout;