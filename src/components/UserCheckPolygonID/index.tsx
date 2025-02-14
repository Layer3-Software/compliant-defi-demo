import GateKeeperModal from "@layer3/gatekeeper-sdk";
import { MetamaskContext } from "lib/contexts";
import { useContext } from "react";

const UserCheckPolygonID = () => {
  const { address } = useContext(MetamaskContext);
  const DEFAULT_COLORS = {
    primaryColor: "#006a65",
    textColor: "white",
    buttonTextColor: "white",
    backgroundColor: "#37444d",
  };

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  if (!address) return null;
  return (
    <div>
      <GateKeeperModal
        account={address}
        polygonId="29f03ca7-13e1-484b-a523-286890d9a606"
        isStaging={true}
        customization={DEFAULT_COLORS}
      />
    </div>
  );
};
export default UserCheckPolygonID;
