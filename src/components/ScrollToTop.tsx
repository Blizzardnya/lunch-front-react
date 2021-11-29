import React from "react";
import { styled } from "@mui/material/styles";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Zoom from "@mui/material/Zoom";

const PREFIX = "ScrollToTop";

const classes = {
  root: `${PREFIX}-root`,
};

const StyledZoom = styled(Zoom)(({ theme }) => ({
  [`& .${classes.root}`]: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

interface Props {
  children: React.ReactElement;
}

const ScrollToTop: React.FC<Props> = (props) => {
  const { children } = props;

  const trigger = useScrollTrigger();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <StyledZoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </StyledZoom>
  );
};

export default ScrollToTop;
