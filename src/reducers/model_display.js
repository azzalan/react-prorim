export default function (state = null, action) {
  switch (action.type) {
  case 'MODEL_DISPLAY':
    return action.payload
  default:
    break
  }
  return state
}
