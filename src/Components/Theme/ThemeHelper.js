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
      }
    });
  }
}

export default themeHelper;