export const maquinasCols = [
  {
    accessor: 'numeroMaquina',
    header: 'Número da máquina',
    type: 'choice',
    choices: ['1', '2', '3']
  },
  {
    accessor: 'disponibilidade',
    header: 'Disponibilidade',
    type: 'choice',
    choices: ['Manutenção', 'Disponível', 'Desativada']
  }
]
