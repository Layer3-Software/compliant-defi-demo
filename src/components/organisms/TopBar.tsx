import React from "react";
import {
  AppBar,
  Avatar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { config } from "config";
import { routes } from "lib/constants";
import { useVerida } from "lib/hooks";

export const TopBar: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const { isConnected, profile, disconnect } = useVerida();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (to: string) => {
    navigate(to);
    closeMenu();
  };

  const handleDisconnectClick = async (): Promise<void> => {
    await disconnect(); // TODO handle error
    closeMenu();
  };

  const menu = (
    <Menu
      id="appbar.menu-more"
      open={menuOpen}
      anchorEl={anchorEl}
      onClose={closeMenu}
      keepMounted
    >
      {isConnected && (
        <MenuItem onClick={() => handleMenuItemClick(routes.profile)}>
          Profile
        </MenuItem>
      )}
      {isConnected && (
        <MenuItem onClick={() => void handleDisconnectClick()}>
          Disconnect
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: `background.default`,
        color: `text.primary`,
      }}
      elevation={0}
    >
      <Toolbar>
        <Typography
          component="h1"
          variant="h6"
          sx={{
            flexGrow: 1,
          }}
        >
          {config.appTitle}
        </Typography>
        <Box>
          {!isConnected && (
            <>
              <Button
                color="inherit"
                onClick={() => handleMenuItemClick(routes.profile)}
              >
                Connect
              </Button>
            </>
          )}
          {isConnected && (
            <IconButton
              aria-label="more"
              aria-controls="appbar.menu-more"
              aria-haspopup="true"
              onClick={handleMenu}
              sx={{ p: 0 }}
            >
              <Avatar
                sx={{ width: { xs: 32, md: 40 }, height: { xs: 32, md: 40 } }}
                alt={profile?.name}
                src={profile?.avatar}
              />
            </IconButton>
          )}
          {menu}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
