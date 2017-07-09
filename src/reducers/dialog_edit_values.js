export default function (state = null, action) {
  switch (action.type) {
  case 'DIALOG_EDIT_VALUES':
    return action.payload
  default:
    break
  }
  return state
}
