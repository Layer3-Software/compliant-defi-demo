import { GateKeeperModal } from "@layer3/gatekeeper-sdk";
import { MetamaskContext } from "lib/contexts";
import { useContext } from "react";

const UserCheckPOH = () => {
  const { signer, address } = useContext(MetamaskContext);

  const customization = {
    primaryColor: "#006a65",
    backgroundColor: "white",
    buttonTextColor: "white",
    textColor: "black",
  };

  const POH_ROLE = "338934a5-138d-4280-8609-1e213807a787";

  const roles = [POH_ROLE];

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  if (!address) return null;
  return (
    <div>
      <GateKeeperModal
        account={address}
        roles={roles}
        simulateKYC={true}
        signer={signer}
        isStaging={true}
        customization={customization}
      />
    </div>
  );
};
export default UserCheckPOH;
