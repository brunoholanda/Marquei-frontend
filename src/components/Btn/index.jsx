import React, { memo } from 'react';
import styles from './Btn.module.scss';

const Btn = memo((props) => {
    return (
        <button className={styles.btn} onClick={props.onClick}>
            {props.children}
        </button>
    );
});

export default Btn;
