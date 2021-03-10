import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  List,
  ListSubheader,
  Divider,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import { Category } from "../types/categoriesTypes";

interface Props {
  categories: Category[];
  onCategoryPress: (id: number | null) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const CategoriesList: React.FC<Props> = ({ categories, onCategoryPress }) => {
  const classes = useStyles();

  return (
    <List
      component="nav"
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
    </List>
  );
};
export default CategoriesList;
