import GateKeeperModal from "@layer3/gatekeeper-sdk";
import { MetamaskContext } from "lib/contexts";
import { useContext } from "react";

const UserCheckKYC = () => {
  const { address } = useContext(MetamaskContext);

  const DEFAULT_COLORS = {
    primaryColor: "#006a65",
    textColor: "white",
    buttonTextColor: "white",
    backgroundColor: "#37444d",
  };

  const KYC_ROLE = "80eb3102-6a8b-4275-b9fd-4d27477821c4";

  const roles = [KYC_ROLE];

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  if (!address) return null;
  return (
    <div>
      <GateKeeperModal
        account={address}
        roles={roles}
        isStaging={true}
        customization={DEFAULT_COLORS}
      />
    </div>
  );
};
export default UserCheckKYC;
