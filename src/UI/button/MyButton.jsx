import React from 'react';
import classes from "./MyButton.module.css";

const MyButton = ({children, classNames, ...props}) => {
    return (
        <button {...props} className={`${classes.btn} ${classNames?.join(' ')}`}>
            {children}
        </button>
    );
};

export default MyButton;