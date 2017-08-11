export default function (state = null, action) {
  switch (action.type) {
  case 'ALERT_MESSAGES':
    return action.payload
  default:
    break
  }
  return state
}
