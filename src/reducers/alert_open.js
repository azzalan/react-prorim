export default function (state = null, action) {
  switch (action.type) {
  case 'ALERT_OPEN':
    return action.payload
  default:
    break
  }
  return state
}
