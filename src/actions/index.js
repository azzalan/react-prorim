export function selectTableData (tableData) {
  return {
    type: 'TABLE_DATA',
    payload: tableData
  }
}

export function selectModelData (modelData) {
  return {
    type: 'MODEL_DATA',
    payload: modelData
  }
}

export function selectTable (table) {
  return {
    type: 'TABLE',
    payload: table
  }
}

export function newLogin () {
  return {
    type: 'LOG',
    payload: {
      status: false
    }
  }
}

export function login () {
  return {
    type: 'LOG',
    payload: {
      status: true
    }
  }
}

export function logout () {
  return {
    type: 'LOG',
    payload: {
      status: false
    }
  }
}

export function selectLog (log) {
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

export function selectGroupInputOpen (groupInputOpen) {
  return {
    type: 'GROUP_INPUT_OPEN',
    payload: groupInputOpen
  }
}

export function selectChoices (choices) {
  return {
    type: 'CHOICES',
    payload: choices
  }
}

export function selectDialogEditValues (dialogEditValues) {
  return {
    type: 'DIALOG_EDIT_VALUES',
    payload: dialogEditValues
  }
}

export function selectModelDisplay (modelDisplay) {
  return {
    type: 'MODEL_DISPLAY',
    payload: modelDisplay
  }
}

export function selectMenuLeftOpen (open) {
  return {
    type: 'MENU_LEFT_OPEN',
    payload: open
  }
}

export function selectListToAddData (listToAddData) {
  return {
    type: 'LIST_TO_ADD_DATA',
    payload: listToAddData
  }
}

export function selectDialogAddIsOpen (dialogAddIsOpen) {
  return {
    type: 'DIALOG_ADD_IS_OPEN',
    payload: dialogAddIsOpen
  }
}

export function selectDialogEditIsOpen (dialogEditIsOpen) {
  return {
    type: 'DIALOG_EDIT_IS_OPEN',
    payload: dialogEditIsOpen
  }
}

export function selectDialogAgendamentosIsOpen (dialogAgendamentosIsOpen) {
  return {
    type: 'DIALOG_AGENDAMENTOS_IS_OPEN',
    payload: dialogAgendamentosIsOpen
  }
}

export function selectDialogAddAgendamentosIsOpen (dialogAddAgendamentosIsOpen) {
  return {
    type: 'DIALOG_ADD_AGENDAMENTOS_IS_OPEN',
    payload: dialogAddAgendamentosIsOpen
  }
}

export function selectDialogAgendamentosData (dialogAgendamentosData) {
  return {
    type: 'DIALOG_AGENDAMENTOS_DATA',
    payload: dialogAgendamentosData
  }
}

export function selectDialogAddAgendamentosData (dialogAddAgendamentosData) {
  return {
    type: 'DIALOG_ADD_AGENDAMENTOS_DATA',
    payload: dialogAddAgendamentosData
  }
}

export function selectFormData (formData) {
  return {
    type: 'FORM_DATA',
    payload: formData
  }
}
