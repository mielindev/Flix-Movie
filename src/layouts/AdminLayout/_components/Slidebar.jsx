import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { drawerWidth, slidebarContent } from "../../../constants";
import { useNavigate } from "react-router-dom";

export default function Slidebar() {
  const navigate = useNavigate();
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />

      <List>
        {slidebarContent.map((item, index) => (
          <ListItem
            dense={true}
            key={item.context}
            disablePadding
            sx={{ py: 1 }}
          >
            <ListItemButton
              onClick={() => {
                navigate(item.local);
              }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.context} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
