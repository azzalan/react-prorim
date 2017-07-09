export default function (state = null, action) {
  switch (action.type) {
  case 'MENU_LEFT_OPEN':
    return action.payload
  default:
    break
  }
  return state
}
