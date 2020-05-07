import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import cx from "classnames"; //helper for using multiple css classes
import { mainIcon, secondaryIcon } from "../../Assets";
import useWindowDimensions from "../../Helpers/WindowDimensionHelper";

const Sidebar = props => {
  const { width } = useWindowDimensions();
  const [openState, setOpenState] = useState({ isOpen: width > 768 });
  const toggleDrawer = () => {
    setOpenState({ isOpen: !openState.isOpen });
  };

  return (
    <div>
      <div
        className={
          openState.isOpen
            ? styles.mainContainer
            : cx(styles.mainContainer, styles.displayNone)
        }
      >
        <div className={styles.buttonContainer1}>
          <button onClick={() => toggleDrawer()} className={styles.closebutton}>
            {openState.isOpen ? "Close" : "Open"}
          </button>
          <img src={mainIcon} alt="uppericon" className={styles.img1} />
          {props.options.map((item, index) => {
            let classes = null;
            if (props.selectedPage === item)
              //if item is selected page then we are adding active class
              classes = cx(styles.button, styles.active);
            else classes = styles.button;

            return (
              <div
                key={index}
                className={classes}
                onClick={() => props.optionSelectedHandler(item)}
              >
                {item}
              </div>
            );
          })}
          <img src={secondaryIcon} alt="lowericon" className={styles.img2} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
