import { Upgrade } from "remultiform/database";
import ResidentDatabaseSchema from "../../../ResidentDatabaseSchema";

const upgradeSchema = (
  upgrade: Upgrade<ResidentDatabaseSchema["schema"]>
): void => {
  upgrade.createStore("otherSupport");
};
export default upgradeSchema;
