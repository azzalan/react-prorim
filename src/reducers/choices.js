export default function (state = null, action) {
  switch (action.type) {
  case 'CHOICES':
    return action.payload
  default:
    break
  }
  return state
}
