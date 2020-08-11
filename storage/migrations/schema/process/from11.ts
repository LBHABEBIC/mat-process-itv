import { Upgrade } from "remultiform/database";
import ProcessDatabaseSchema from "../../../ProcessDatabaseSchema";

const upgradeSchema = (
  upgrade: Upgrade<ProcessDatabaseSchema["schema"]>
): void => {
  // We don't remove the `otherNotes` store, which were removed from the schema
  // with this version, to guard against data loss.
  upgrade.createStore("other");
};
export default upgradeSchema;
