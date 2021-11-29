import React from "react";
import { styled } from "@mui/material/styles";
import {
  List,
  ListSubheader,
  Divider,
  ListItem,
  ListItemText,
} from "@mui/material";

import { Category } from "../types/categoriesTypes";

const PREFIX = "CategoriesList";

const classes = {
  root: `${PREFIX}-root`,
};

const StyledList = styled(List)(({ theme }) => ({
  [`&.${classes.root}`]: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

interface Props {
  categories: Category[];
  onCategoryPress: (id: number | null) => void;
}

const CategoriesList: React.FC<Props> = ({ categories, onCategoryPress }) => {
  return (
    <StyledList
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Категории
        </ListSubheader>
      }
      className={classes.root}
    >
      {categories.map((item) => (
        <ListItem key={item.id} button onClick={() => onCategoryPress(item.id)}>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
      <Divider />
      <ListItem key={0} button onClick={() => onCategoryPress(null)}>
        <ListItemText primary="Все" />
      </ListItem>
    </StyledList>
  );
};
export default CategoriesList;
