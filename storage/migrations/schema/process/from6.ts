import { Upgrade } from "remultiform/database";
import ProcessDatabaseSchema from "../../../ProcessDatabaseSchema";

const upgradeSchema = (
  upgrade: Upgrade<ProcessDatabaseSchema["schema"]>
): void => {
  upgrade.createStore("submitted");
};
export default upgradeSchema;
