import { Upgrade } from "remultiform/database";
import ResidentDatabaseSchema from "../../../ResidentDatabaseSchema";
import from0 from "./from0";

export default {
  0: from0,
} as {
  [n: number]:
    | ((upgrade: Upgrade<ResidentDatabaseSchema["schema"]>) => void)
    | undefined;
};
