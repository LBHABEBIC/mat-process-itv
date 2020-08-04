import ProcessStepDefinition from "../../helpers/ProcessStepDefinition";
import ProcessDatabaseSchema from "../../storage/ProcessDatabaseSchema";
import disability from "./disability";
import health from "./health";
import supportNeeds from "./support-needs";

export type WellbeingSupportStoreNames =
  | "healthConcerns"
  | "disability"
  | "supportNeeds";

export default [
  health as ProcessStepDefinition<
    ProcessDatabaseSchema,
    WellbeingSupportStoreNames
  >,
  disability as ProcessStepDefinition<
    ProcessDatabaseSchema,
    WellbeingSupportStoreNames
  >,
  supportNeeds as ProcessStepDefinition<
    ProcessDatabaseSchema,
    WellbeingSupportStoreNames
  >,
];
