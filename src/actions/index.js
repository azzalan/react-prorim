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

