import React, { useState } from "react";
import {
  List,
  ListSubheader,
  Divider,
  ListItemText,
  ListItemButton,
  Box,
} from "@mui/material";

import { Category } from "../types/categoriesTypes";

interface Props {
  categories: Category[];
  onCategoryPress: (id: number | null) => void;
}

const CategoriesList: React.FC<Props> = ({ categories, onCategoryPress }) => {
  const [selectedID, setSelectedID] = useState(0);

  const handleListItemClick = (id: number) => {
    setSelectedID(id);
    onCategoryPress(id ?? null);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List
        component="nav"
        aria-label="categories"
        subheader={
          <ListSubheader component="div" id="categories-list-subheader">
            Категории
          </ListSubheader>
        }
      >
        {categories.map((item) => (
          <ListItemButton
            key={item.id}
            selected={item.id === selectedID}
            onClick={() => handleListItemClick(item.id)}
          >
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
        <Divider />
        <ListItemButton
          key={0}
          selected={selectedID === 0}
          onClick={() => handleListItemClick(0)}
        >
          <ListItemText primary="Все" />
        </ListItemButton>
      </List>
    </Box>
  );
};
export default CategoriesList;
