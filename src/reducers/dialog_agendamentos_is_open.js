export default function (state = null, action) {
  switch (action.type) {
  case 'DIALOG_AGENDAMENTOS_IS_OPEN':
    return action.payload
  default:
    break
  }
  return state
}
