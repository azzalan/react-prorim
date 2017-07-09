export default function (state = null, action) {
  switch (action.type) {
  case 'FORM_DATA':
    return action.payload
  default:
    break
  }
  return state
}
