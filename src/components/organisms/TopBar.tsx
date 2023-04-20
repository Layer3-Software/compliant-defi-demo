/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext } from "react";
import {
  AppBar,
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
import { AvatarWithID } from "components/atoms";
import { connectMetamask } from "lib/utils/metamaskConnections";
import { MetamaskContext } from "lib/contexts";

export const TopBar: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const { setAddress, setSigner, setIsConnected, isConnected, address } =
    useContext(MetamaskContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const { profile, disconnect } = useVerida();

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

  const connect = async () => {
    const res = await connectMetamask();

    if (res) {
      setAddress(res.address);
      setSigner(res.signer);
      setIsConnected(true);
    }
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
        backgroundColor: `transparent`,
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
              <Button color="inherit" onClick={connect}>
                Connect here
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
              <AvatarWithID
                id={address}
                imageAlt={profile?.name}
                imageSrc={profile?.avatarUri}
              />
            </IconButton>
          )}
          {menu}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
