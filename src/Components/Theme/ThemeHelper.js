import { createMuiTheme } from '@material-ui/core/styles';

const themeHelper = (theme) => {
    if (theme === "light") {
        return createMuiTheme({
            palette: {
              primary: {
                main : "#FFFFFF"
              },
              secondary:{
                main : '#368bf6'
              },
              type:"light"
            }
        });
    } else {
        return createMuiTheme({
            palette: {
              primary: {
                main : "#333"
              },
              secondary:{
                main : '#368bf6'
              },
              type:"dark"
            }
        });
    }
}

export default themeHelper;