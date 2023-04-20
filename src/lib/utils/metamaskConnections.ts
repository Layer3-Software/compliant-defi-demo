/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";

import { toChecksumAddress } from "web3-utils";
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}
export const connectMetamask = async () => {
  if (window.ethereum) {
    try {
      const accounts: string[] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const address: string = toChecksumAddress(accounts[0]);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const provider: Web3Provider = new Web3Provider(window.ethereum, "any");
      const signer: JsonRpcSigner = provider.getSigner();

      return {
        address,
        provider,
        signer,
      };
    } catch (ex) {
      console.error(ex);
      return {
        address: "",
        provider: null,
        signer: null,
      };
    }
  }
  return {
    address: "",
    provider: null,
    signer: null,
  };
};
