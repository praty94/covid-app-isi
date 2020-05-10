import React from "react";
import { sidebarOptions } from "../../Data/AppElements";
import { ThemeProvider } from '@material-ui/core/styles';
import ResponsiveAppDrawer from '../AppDrawer/AppDrawer';
import ThemeHelper from '../Theme/ThemeHelper';
import PageSwitchHelper from '../PageSwitchHelper/PageSwitchHelper';
import Wrapper from '../../HOC/Wrapper';

let light = "light", dark = "dark";
class Dashboard extends React.Component {
  state = {
    theme: localStorage.getItem('theme') || light,
    currentPage: sidebarOptions[0].id
  };
  render() {
    return (
      <ThemeProvider theme={ThemeHelper(this.state.theme)}>
        <ResponsiveAppDrawer options={sidebarOptions} curTheme={this.state.theme} currentPage={this.state.currentPage}
          themeToggleHandler={() => this.toggleTheme()} optionSelectedHandler={(val) => this.setCurrentpage(val)}></ResponsiveAppDrawer>
        <Wrapper>
          <PageSwitchHelper pageId={this.state.currentPage}></PageSwitchHelper>
        </Wrapper>
      </ThemeProvider>
    );
  }

  setCurrentpage = pageid => {
    //updating state only if selected page is different
    if (pageid !== this.state.currentPage)
      this.setState({ currentPage: pageid });
  };

  toggleTheme = () => {
    if (this.state.theme === light) {
      this.setState({ theme: dark });
      localStorage.setItem('theme', dark);
    } else {
      this.setState({ theme: light });
      localStorage.setItem('theme', light);
    }
  }
}

export default Dashboard;
