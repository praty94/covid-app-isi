import React from "react";
import { sidebarOptions } from "../../Data/AppElements";
import { ThemeProvider } from '@material-ui/core/styles';
import ResponsiveAppDrawer from '../AppDrawer/AppDrawer';
import ThemeHelper,{themeColors} from '../Theme/ThemeHelper';
import PageSwitchHelper from '../PageSwitchHelper/PageSwitchHelper';
import Wrapper from '../../HOC/Wrapper';

let light = "light", dark = "dark";
class AppShell extends React.Component {
  state = {
    theme: localStorage.getItem('theme') || light,
    currentPage: sidebarOptions[0]
  };
  render() {
    return (
      <ThemeProvider theme={ThemeHelper(this.state.theme)}>
        <ResponsiveAppDrawer options={sidebarOptions} curTheme={this.state.theme} currentPage={this.state.currentPage}
          themeToggleHandler={() => this.toggleTheme()} optionSelectedHandler={(val) => this.setCurrentpage(val)}></ResponsiveAppDrawer>
        <Wrapper>
          <PageSwitchHelper pageId={this.state.currentPage.id} theme={this.state.theme}></PageSwitchHelper>
        </Wrapper>
      </ThemeProvider>
    );
  }
  componentDidMount(){
    document.body.style.backgroundColor = themeColors[this.state.theme].primary;
  }
  setCurrentpage = (page) => {
    //updating state only if selected page is different
    if (page.id !== this.state.currentPage.id)
      this.setState({ currentPage: page });
  };

  toggleTheme = () => {
    if (this.state.theme === light) {
      this.setState({ theme: dark });
      document.body.style.backgroundColor = themeColors.dark.primary;
      localStorage.setItem('theme', dark);

    } else {
      this.setState({ theme: light });
      document.body.style.backgroundColor = themeColors.light.primary;
      localStorage.setItem('theme', light);
    }
  }
}

export default AppShell;
