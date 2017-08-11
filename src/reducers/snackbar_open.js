export default function (state = null, action) {
  switch (action.type) {
  case 'SNACKBAR_OPEN':
    return action.payload
  default:
    break
  }
  return state
}
