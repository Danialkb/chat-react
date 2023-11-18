import React from 'react';
import classes from "./MyInput.module.css";

const MyInput = ({classNames, ...props}) => {
    return (
        <input  {...props} className={`${classes.input} ${classNames?.join(' ')}`}/>
    );
};

export default MyInput;