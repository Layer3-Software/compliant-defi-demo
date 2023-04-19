import { GateKeeperModal } from "@layer3/gatekeeper-sdk";
import { useVerida } from "lib/hooks";

const UserCheck = () => {
  const { did } = useVerida();

  const parts = did?.split(":") || "";
  const userAddress: string = parts[parts.length - 1];

  const customization = {
    primaryColor: "#059669",
    backgroundColor: "#141724",
    buttonTextColor: "#e2e8f0",
    textColor: "#e2e8f0",
  };

  const roles = ["64726a3f-b5a6-48c4-82c5-295e480f2091"];

  if (!userAddress) return null;
  return (
    <GateKeeperModal
      account={userAddress}
      roles={roles}
      isStaging={true}
      customization={customization}
    />
  );
};
export default UserCheck;
