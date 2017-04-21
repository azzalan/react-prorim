export default function (state = null, action) {
  switch (action.type) {
    case 'TABLE':
      return action.payload
    default:
      break
  }
  return state
}
