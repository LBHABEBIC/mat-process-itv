const upgradeSchema = (): void => {
  // We don't remove the `id`, `residency`, or `tenants` stores,
  // which were removed from the schema with this version, to guard
  // against data loss.
};
export default upgradeSchema;
