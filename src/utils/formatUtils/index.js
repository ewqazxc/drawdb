
export const formatRelationshipName = (idObj, tables) => {
  const { startTableId, endTableId, startFieldId, endFieldId } = idObj;
  const linkingTable = tables[startTableId];
  const hoveredTable = tables[endTableId];
  return `fk_${linkingTable.name}_${linkingTable.fields[startFieldId].name
    }_${hoveredTable.name}_${hoveredTable.fields[endFieldId].name}`;
};
export const formatSQLRelationshipName = (startTableName, startFieldName, endTableName, options) => {
  let name = "fk_" + startTableName + "_" + startFieldName + "_" + endTableName;
  if (options?.endFieldName) {
    name += `_${options?.endFieldName}`;
  }
  return name;
};