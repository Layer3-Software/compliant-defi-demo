import { GateKeeperModal } from "@layer3/gatekeeper-sdk";
import { MetamaskContext } from "lib/contexts";
import { useContext } from "react";

const UserCheck = () => {
  const { signer, address } = useContext(MetamaskContext);

  const customization = {
    primaryColor: "#006a65",
    backgroundColor: "white",
    buttonTextColor: "white",
    textColor: "black",
  };

  const KYC_ROLE_VERIDA = "338934a5-138d-4280-8609-1e213807a787";
  const ROLE = "25b9e354-a6d4-4e0d-91f6-69669da7a7d9";

  const roles = [ROLE];

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  if (!address) return null;
  return (
    <div>
      <GateKeeperModal
        account={address}
        roles={roles}
        simulateKYC={false}
        signer={signer}
        isStaging={true}
        customization={customization}
      />
    </div>
  );
};
export default UserCheck;
