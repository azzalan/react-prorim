export default function (state = null, action) {
  switch (action.type) {
  case 'MODEL_DATA':
    return action.payload
  default:
    break
  }
  return state
}
