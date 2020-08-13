import { Upgrade } from "remultiform/database";
import ProcessDatabaseSchema from "../../../ProcessDatabaseSchema";

const upgradeSchema = (
  upgrade: Upgrade<ProcessDatabaseSchema["schema"]>
): void => {
  upgrade.createStore("lastModified");
  upgrade.createStore("property");
  upgrade.createStore("isUnannouncedVisit");
  upgrade.createStore("isVisitInside");
  upgrade.createStore("healthConcerns");
  upgrade.createStore("disability");
  upgrade.createStore("supportNeeds");
  upgrade.createStore("household");
  upgrade.createStore("tenantsPresent");
  upgrade.createStore("submitted");
  upgrade.createStore("unableToEnter");
  upgrade.createStore("managerComments");
  upgrade.createStore("other");
};

export default upgradeSchema;
