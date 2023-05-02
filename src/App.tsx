import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Route, Routes, useMatch, useNavigate } from "react-router-dom";
import { routes } from "lib/constants";
import { Box, Container } from "@mui/material";
import { TopBar } from "components/organisms";
import { HomeView, ProfileDialog } from "components/views";
import { HomeView2 } from "components/HomeView2";

const TopBarOffset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const App: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const profileRouteMatch = useMatch(routes.profile);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setDialogOpen(!!profileRouteMatch);
  }, [profileRouteMatch]);

  const closeDialog = () => {
    setDialogOpen(false);
    navigate(routes.home);
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TopBar />
      <TopBarOffset />
      <Box component="main" sx={{ flexGrow: 1, pt: 2 }}>
        <Container maxWidth="sm">
          <Routes>
            <Route element={<HomeView />} path="/" />
            <Route element={<HomeView2 />} path="/POH" />
          </Routes>
        </Container>
      </Box>
      <ProfileDialog
        open={dialogOpen && !!profileRouteMatch}
        onClose={closeDialog}
      />
    </Box>
  );
};
