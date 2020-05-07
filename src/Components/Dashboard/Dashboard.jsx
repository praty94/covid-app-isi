import React from "react";
import { pages } from "../../Data/AppElements";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Dashboard.module.css";
import { rightarrow } from "../../Assets";
class Dashboard extends React.Component {
  state = {
    currentPage: pages[0]
  };
  render() {
    return (
      <div>
        <button className={styles.closebutton}>
          <img
            src={rightarrow}
            alt="rightarrow"
            className={styles.crossbutton}
          />
        </button>
        <Sidebar
          options={pages}
          selectedPage={this.state.currentPage}
          optionSelectedHandler={page => this.setCurrentpage(page)}
        ></Sidebar>
      </div>
    );
  }
  setCurrentpage = page => {
    //updating state only if selected page is different
    if (page !== this.state.currentPage) this.setState({ currentPage: page });
  };
}

export default Dashboard;
