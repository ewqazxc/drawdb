
export const formatRelationshipName = (idObj, tables) => {
  console.log('idObj, tables  ::', { idObj, tables });
  const { linkingLine, hoveredTable } = idObj;

  const { fields: startTableFields, name: startTableName } = tables.find(
    (t) => t.id === linkingLine.startTableId,
  );
  const { name: startFieldName } = startTableFields.find(
    (f) => f.id === linkingLine.startFieldId,
  );
  const { fields: endTableFields, name: endTableName } = tables.find(
    (t) => t.id === hoveredTable.tableId,
  );
  const { name: endFieldName } = endTableFields.find(
    (f) => f.id === hoveredTable.fieldId,
  );
  return `fk_${startTableName}_${startFieldName}_${endTableName}_${endFieldName}`;
};
export const formatSQLRelationshipName = (startTableName, startFieldName, endTableName, options) => {
  let name = "fk_" + startTableName + "_" + startFieldName + "_" + endTableName;
  if (options?.endFieldName) {
    name += `_${options?.endFieldName}`;
  }
  return name;
};