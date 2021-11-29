import React from "react";
import { styled } from "@mui/material/styles";
import { Backdrop, CircularProgress } from "@mui/material";

const PREFIX = "Loading";

const classes = {
  backdrop: `${PREFIX}-backdrop`,
};

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  [`&.${classes.backdrop}`]: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

interface Props {
  isLoading: boolean;
}

const Loading: React.FC<Props> = ({ isLoading }) => {
  return (
    <StyledBackdrop className={classes.backdrop} open={isLoading}>
      <CircularProgress color="inherit" />
    </StyledBackdrop>
  );
};

export default Loading;
