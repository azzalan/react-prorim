export default (list, paciente) => {
  let unique = true
  list.forEach((pacienteInList) => {
    if (paciente.id === pacienteInList.id) {
      unique = false
    }
  })
  if (unique) list.push(paciente)
}
