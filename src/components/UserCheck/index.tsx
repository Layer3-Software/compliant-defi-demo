import { JsonRpcSigner } from "@ethersproject/providers";
import { GateKeeperModal } from "@layer3/gatekeeper-sdk";

import { connectMetamask } from "lib/utils/metamaskConnections";
import { useState } from "react";

const UserCheck = () => {
  const [address, setAddress] = useState<string>("");
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

  const customization = {
    primaryColor: "#059669",
    backgroundColor: "#141724",
    buttonTextColor: "#e2e8f0",
    textColor: "#e2e8f0",
  };

  const roles = ["64726a3f-b5a6-48c4-82c5-295e480f2091"];

  const connect = async () => {
    const res = await connectMetamask();

    if (res) {
      setAddress(res.address);
      setSigner(res.signer);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  if (!address) return <button onClick={connect}>CONNECT METAMASK</button>;
  return (
    <div>
      <GateKeeperModal
        account={address}
        roles={roles}
        signer={signer}
        isStaging={true}
        customization={customization}
      />
    </div>
  );
};
export default UserCheck;
