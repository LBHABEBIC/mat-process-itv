import { Upgrade } from "remultiform/database";
import ResidentDatabaseSchema from "../../../ResidentDatabaseSchema";

const upgradeSchema = (
  upgrade: Upgrade<ResidentDatabaseSchema["schema"]>
): void => {
  upgrade.createStore("id");
  upgrade.createStore("residency");
  upgrade.createStore("photo");
  upgrade.createStore("nextOfKin");
  upgrade.createStore("carer");
};
export default upgradeSchema;
