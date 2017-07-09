export default function (state = null, action) {
  switch (action.type) {
  case 'LIST_TO_ADD_DATA':
    return action.payload
  default:
    break
  }
  return state
}
