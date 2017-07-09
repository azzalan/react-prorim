// 'state' não é o state do app, mas somente o state a
// que esse reducer é responsável.
export default function (state = null, action) {
  switch (action.type) {
  case 'FILTER_DATA':
    return action.payload
  default:
    break
  }
  return state
}
