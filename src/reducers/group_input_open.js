export default function (state = null, action) {
  switch (action.type) {
  case 'GROUP_INPUT_OPEN':
    return action.payload
  default:
    break
  }
  return state
}
