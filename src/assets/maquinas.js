export const maquinasForm = [
  {
    accessor: 'numero',
    header: 'Número da máquina',
    type: 'text'
  },
  {
    accessor: 'fabricante',
    header: 'Fabricante',
    type: 'text'
  },
  {
    accessor: 'disponibilidade',
    header: 'Disponibilidade',
    type: 'choice',
    show: 'nome',
    choicesUrl: 'choice-disponibilidade-maquina/'
  },
  {
    accessor: 'sala',
    header: 'Sala',
    type: 'choice',
    show: 'identificador',
    choicesUrl: 'sala/'
  }
]
