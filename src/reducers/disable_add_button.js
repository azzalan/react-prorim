export default function (state = null, action) {
  switch (action.type) {
  case 'DISABLE_ADD_BUTTON':
    return action.payload
  default:
    break
  }
  return state
}
