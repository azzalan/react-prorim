export const maquinasCols = [
  {
    accessor: 'numero',
    header: 'Número da máquina',
    type: 'choice',
    choices: ['1', '2', '3']
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
    choices: ['Manutenção', 'Disponível', 'Desativada']
  }
]
