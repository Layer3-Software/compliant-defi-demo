/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { KeyboardArrowDown as ArrowDownIcon } from "@mui/icons-material";
import {
  swapAssets,
  defaultGiveAsset,
  defaultReceiveAsset,
} from "lib/constants";
import { MetamaskContext } from "lib/contexts";
import { connectMetamask } from "lib/utils/metamaskConnections";

export const SwapBox: React.FunctionComponent = () => {
  const { isConnected, setAddress, setIsConnected, setSigner } =
    useContext(MetamaskContext);

  const connect = async () => {
    const res = await connectMetamask();

    if (res) {
      setAddress(res.address);
      setSigner(res.signer);
      setIsConnected(true);
    }
  };
  return (
    <Paper sx={{ width: "100%" }} elevation={8}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
        <Box>
          <Typography component="h2" variant="h5">
            Swap
          </Typography>
        </Box>
        <Box component="form" noValidate autoComplete="off">
          <Box sx={{ display: "flex", gap: 1, mt: 2, mb: 1 }}>
            <TextField
              label="Give"
              variant="outlined"
              size="medium"
              defaultValue={0}
              placeholder="0.00"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              sx={{ flexGrow: 1 }}
            />
            <TextField
              select
              variant="outlined"
              size="medium"
              defaultValue={defaultGiveAsset}
            >
              {swapAssets.map((asset) => (
                <MenuItem key={asset} value={asset}>
                  {asset}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", m: 0, p: 0 }}>
            <ArrowDownIcon />
          </Box>
          <Box sx={{ display: "flex", gap: 1, mt: 1, mb: 2 }}>
            <TextField
              label="Receive"
              variant="outlined"
              size="medium"
              defaultValue={0}
              placeholder="0.00"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              sx={{ flexGrow: 1 }}
            />
            <TextField
              select
              variant="outlined"
              size="medium"
              defaultValue={defaultReceiveAsset}
            >
              {swapAssets.map((asset) => (
                <MenuItem key={asset} value={asset}>
                  {asset}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          {!isConnected && (
            <Button
              variant="contained"
              size="large"
              sx={{ width: "100%" }}
              onClick={connect}
            >
              Connect Wallet
            </Button>
          )}
          {isConnected && (
            <Button variant="contained" size="large" sx={{ width: "100%" }}>
              Swap
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};
