export const maquinasCols = [
  {
    accessor: 'numero',
    header: 'Número da máquina',
    type: 'textNumber'
  },
  {
    accessor: 'fabricante',
    header: 'Fabricante',
    type: 'text'
  },
  {
    accessor: 'disponibilidade',
    header: 'Disponibilidade',
    type: 'obj',
    show: 'nome',
    choicesUrl: 'choice-disponibilidade-maquina/'
  }
]
