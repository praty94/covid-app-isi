import { createMuiTheme } from '@material-ui/core/styles';
export const themeColors =
{
  light: { primary: "#FFFFFF", secondary: '#81c784' },
  dark: { primary: "#333", secondary: '#81c784' }
};
const themeHelper = (theme) => {
  if (theme === "light") {
    return createMuiTheme({
      palette: {
        primary: {
          main: themeColors.light.primary
        },
        secondary: {
          main: themeColors.light.secondary
        },
        type: "light"
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          smmd:690,
          md: 960,
          lg: 1280,
          xl: 1920,
        },
      }
    });
  } else {
    return createMuiTheme({
      palette: {
        primary: {
          main: themeColors.dark.primary
        },
        secondary: {
          main:  themeColors.dark.secondary
        },
        type: "dark"
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          smmd:690,
          md: 960,
          lg: 1280,
          xl: 1920,
        },
      }
    });
  }
}

export default themeHelper;