import { Upgrade } from "remultiform/database";
import ProcessDatabaseSchema from "../../../ProcessDatabaseSchema";

const upgradeSchema = (
  upgrade: Upgrade<ProcessDatabaseSchema["schema"]>
): void => {
  upgrade.createStore("tenantsPresent");
};
export default upgradeSchema;
