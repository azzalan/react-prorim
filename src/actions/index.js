export function selectTableData (tableData) {
  // tem que ser um objeto com uma propriedade 'type'
  return {
    type: 'TABLE_DATA_SELECTED',
    payload: tableData
  }
}
