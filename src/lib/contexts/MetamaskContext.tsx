import { JsonRpcSigner } from "@ethersproject/providers";
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface Context {
  address: string;
  signer: JsonRpcSigner | null;
  isConnected: boolean;
  setAddress: Dispatch<SetStateAction<string>>;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
  setIsConnected: Dispatch<SetStateAction<boolean>>;
}

export const MetamaskContext = createContext<Context>({
  address: "",
  signer: null,
  isConnected: false,
  setAddress: () => {},
  setSigner: () => {},
  setIsConnected: () => {},
});

const MetamaskContextProvider = ({ children }: { children: JSX.Element }) => {
  const [address, setAddress] = useState("");
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const data = {
    address,
    signer,
    isConnected,
    setIsConnected,
    setAddress,
    setSigner,
  };

  return (
    <MetamaskContext.Provider value={data}>{children}</MetamaskContext.Provider>
  );
};

export default MetamaskContextProvider;
