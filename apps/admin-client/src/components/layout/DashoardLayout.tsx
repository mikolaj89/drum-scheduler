"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const EXPANDED_WIDTH = 240;
const COLLAPSED_WIDTH = 0; // Width when collapsed

export const DashboardLayout = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(true);
  const [currentDrawerWidth, setCurrentDrawerWidth] = useState(EXPANDED_WIDTH);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setCurrentDrawerWidth(open ? EXPANDED_WIDTH : COLLAPSED_WIDTH);
  }, [open]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: currentDrawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: currentDrawerWidth,
            transition: "width 0.3s",
            overflowX: "hidden",
            boxSizing: "border-box",
          },
        }}
      >
        <List>
          {["Sessions", "Exercises"].map((text) => (
            <ListItem
              sx={{
                gap: 1,
              }}
              key={text}
            >
              <FormatListBulletedIcon /> <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${currentDrawerWidth}px)`,
            transition: "width 0.3s",
            boxSizing: "border-box",
            ml: `${currentDrawerWidth}px`,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Drum session scheduler
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Toolbar /> {/* Spacer to push content below AppBar */}
        <div>
            {children}
        </div>
      </Box>
    </Box>
  );
};
