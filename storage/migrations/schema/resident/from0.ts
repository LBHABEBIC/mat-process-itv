import { Upgrade } from "remultiform/database";
import ResidentDatabaseSchema from "../../../ResidentDatabaseSchema";

const upgradeSchema = (
  upgrade: Upgrade<ResidentDatabaseSchema["schema"]>
): void => {
  upgrade.createStore("id");
  upgrade.createStore("photo");
  upgrade.createStore("nextOfKin");
  upgrade.createStore("carer");
  upgrade.createStore("signature");
  upgrade.createStore("otherSupport");
  upgrade.createStore("disabilities");
};
export default upgradeSchema;
