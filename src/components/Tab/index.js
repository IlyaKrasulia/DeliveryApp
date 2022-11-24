import React from "react";

import './tab.css'

import tabOpenIcon from "../../assets/images/open-tab.svg"
import tabCloseIcon from "../../assets/images/close-tab.svg"

const Tab = ({ title, inline, handleClick, opened}) => {
    return( 
        <div className={`tab ${opened ? 'opened' : ''}`} onClick={handleClick}>
            <h3 style={inline} className="tabTitle">{title}</h3>
            <img className="tabImg" src={opened ? tabCloseIcon : tabOpenIcon} alt="open tab icon"/>
        </div>
    )
}

export default Tab;