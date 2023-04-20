import { GateKeeperModal } from "@layer3/gatekeeper-sdk";
import { MetamaskContext } from "lib/contexts";
import { useContext } from "react";

const UserCheck = () => {
  const { signer, address } = useContext(MetamaskContext);

  const customization = {
    primaryColor: "white",
    backgroundColor: "#006a65",
    buttonTextColor: "black",
    textColor: "white",
  };

  const KYC_ROLE_VERIDA = "64726a3f-b5a6-48c4-82c5-295e480f2091";

  const roles = [KYC_ROLE_VERIDA];

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  if (!address) return null;
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
