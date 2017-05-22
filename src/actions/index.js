export function selectTableData (tableData) {
  return {
    type: 'TABLE_DATA',
    payload: tableData
  }
}

export function selectTable (table) {
  return {
    type: 'TABLE',
    payload: table
  }
}

export function newLogin () {
  // tem que ser um objeto com uma propriedade 'type'
  return {
    type: 'LOG',
    payload: {
      status: false
    }
  }
}

export function login () {
  // tem que ser um objeto com uma propriedade 'type'
  return {
    type: 'LOG',
    payload: {
      status: true
    }
  }
}

export function logout () {
  // tem que ser um objeto com uma propriedade 'type'
  return {
    type: 'LOG',
    payload: {
      status: false
    }
  }
}

export function selectLog (log) {
  // tem que ser um objeto com uma propriedade 'type'
  return {
    type: 'LOG',
    payload: log
  }
}

export function selectFilterData (filterData) {
  return {
    type: 'FILTER_DATA',
    payload: filterData
  }
}

export function enableAddButton () {
  return {
    type: 'DISABLE_ADD_BUTTON',
    payload: false
  }
}

export function disableAddButton () {
  return {
    type: 'DISABLE_ADD_BUTTON',
    payload: true
  }
}
