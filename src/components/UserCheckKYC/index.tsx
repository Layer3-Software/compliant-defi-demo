/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import GateKeeperModal, { getSignature } from "@layer3/gatekeeper-sdk";
import { MetamaskContext } from "lib/contexts";
import { useContext, useEffect, useState } from "react";

const UserCheckKYC = () => {
  const { address, signer } = useContext(MetamaskContext);
  const [signature, setSignature] = useState<string>("");
  const DEFAULT_COLORS = {
    primaryColor: "#006a65",
    textColor: "white",
    buttonTextColor: "white",
    backgroundColor: "#37444d",
  };

  const KYC_ROLE = "80eb3102-6a8b-4275-b9fd-4d27477821c4";

  const roles = [KYC_ROLE];

  useEffect(() => {
    if (!address) return;
    const init = async () => {
      const appID = "31f8b1b4-a546-4930-8b74-467473d89aa3";
      const { signature } = await getSignature(address, signer, appID, true);

      setSignature(signature || "");
    };

    init();
  }, [address, signer]);

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  if (!signature) return null;
  return (
    <div>
      <GateKeeperModal
        account={address}
        roles={roles}
        signature={signature}
        isStaging={true}
        customization={DEFAULT_COLORS}
      />
    </div>
  );
};
export default UserCheckKYC;
