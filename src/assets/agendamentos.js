export const agendamentosFilter = [
  {
    accessor: 'inicial',
    header: 'Data inicial',
    type: 'date'
  },
  {
    accessor: 'final',
    header: 'Data final',
    type: 'date'
  },
  {
    accessor: 'sala',
    header: 'Sala',
    type: 'choice',
    show: 'identificador',
    choicesUrl: 'sala/'
  }
]
