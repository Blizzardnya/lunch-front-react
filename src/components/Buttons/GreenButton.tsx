import { Button, Theme } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import { green, grey } from "@mui/material/colors";

const GreenButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(green[600]),
    backgroundColor: green[600],
    "&:hover": {
      backgroundColor: green[800],
    },
    "&:disabled": {
      color: theme.palette.getContrastText(grey[400]),
      backgroundColor: grey[400],
    },
  },
}))(Button);

export default GreenButton;
