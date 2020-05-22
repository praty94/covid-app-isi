import React, { useContext } from "react";
import { sidebarOptions } from "../../Data/AppElements";
import { ThemeProvider } from '@material-ui/core/styles';
import ResponsiveAppDrawer from '../AppDrawer/AppDrawer';
import ThemeHelper, { themeColors } from '../Theme/ThemeHelper';
import PageSwitchHelper from '../PageSwitchHelper/PageSwitchHelper';
import Wrapper from '../../HOC/Wrapper';
import {AppContext} from '../../Context/AppContext';
import { useEffect } from "react";

const light = "light", dark = "dark";

const AppShell = () => {
  const [appState, setAppState] = useContext(AppContext);

  const setCurrentpage = (page) => {
    //updating state only if selected page is different
    if (page.id !== appState.currentPage.id)
      setAppState({ theme: appState.theme, currentPage: page });
  };

  const toggleTheme = () => {
    if (appState.theme === light) {
      setAppState({ theme: dark, currentPage: appState.currentPage });
      document.body.style.backgroundColor = themeColors.dark.primary;
      localStorage.setItem('theme', dark);
    } else {
      setAppState({ theme: light, currentPage: appState.currentPage });
      document.body.style.backgroundColor = themeColors.light.primary;
      localStorage.setItem('theme', light);
    }
  }

  useEffect(() => {
    document.body.style.backgroundColor = themeColors[appState.theme].primary;
  }, [appState.theme]);

  return (
    <ThemeProvider theme={ThemeHelper(appState.theme)}>
      <ResponsiveAppDrawer options={sidebarOptions} curTheme={appState.theme} currentPage={appState.currentPage}
        themeToggleHandler={() => toggleTheme()} optionSelectedHandler={(val) => setCurrentpage(val)}></ResponsiveAppDrawer>
      <Wrapper>
        <PageSwitchHelper pageId={appState.currentPage.id} theme={appState.theme}></PageSwitchHelper>
      </Wrapper>
    </ThemeProvider>
  );

}

export default AppShell;
