import { Avatar, Paper, Typography } from "@mui/material";
import UserCheckPolygonID from "components/UserCheckPolygonID";
import React from "react";
export const GatekeeperProtected = () => {
  return (
    <>
      <Typography variant="h5" align="center">
        This app is protected with GateKeeper. Please connect your wallet and
        follow the prompts.
      </Typography>
      <div style={{ margin: "0 auto", width: "fit-content" }}>
        <UserCheckPolygonID />
      </div>
    </>
  );
};
