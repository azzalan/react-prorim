export default function (state = null, action) {
  switch (action.type) {
    case 'LOG':
      return action.payload
    default:
      break
  }
  return state
}
