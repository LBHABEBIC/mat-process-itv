import { Upgrade } from "remultiform/database";
import ExternalDatabaseSchema from "../../../ExternalDatabaseSchema";

const upgradeSchema = (
  upgrade: Upgrade<ExternalDatabaseSchema["schema"]>
): void => {
  upgrade.createStore("tenancy");
  upgrade.createStore("residents");
  upgrade.createStore("officer");
};
export default upgradeSchema;
