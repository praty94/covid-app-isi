import React from 'react';
import styles from './Sidebar.module.css';
import cx from 'classnames';//helper for using multiple css classes
import { mainIcon, secondaryIcon } from '../../Assets';

const Sidebar = (props) => (
    <div className={styles.mainContainer}>
        <div className={styles.buttonContainer1}>
            <img src={mainIcon} alt="uppericon" className={styles.img1} />
            {props.options.map((item)=> {
                if(props.selectedPage === item)
                    return <div className={cx(styles.button, styles.active)}>{item}</div>;
                else
                    return <div className={styles.button}>{item}</div>;
            })}
            <img src={secondaryIcon} alt="lowericon" className={styles.img2} />
        </div>
    </div>
);

export default Sidebar;