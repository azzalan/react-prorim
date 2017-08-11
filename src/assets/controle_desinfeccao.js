export const controleDesinfeccaoCols = [
  {
    accessor: 'data',
    header: 'Data',
    type: 'date'
  },
  {
    accessor: 'motivo',
    header: 'Motivo',
    type: 'text'
  },
  {
    accessor: 'realizado',
    header: 'Realizado',
    type: 'bool'
  },
  {
    accessor: 'observacao',
    header: 'Observação',
    type: 'text'
  }
]

export const controleDesinfeccaoForm = [
  {
    accessor: 'data',
    header: 'Data',
    type: 'date'
  },
  {
    accessor: 'motivo',
    header: 'Motivo',
    type: 'text'
  },
  {
    accessor: 'realizado',
    header: 'Realizado',
    type: 'bool'
  },
  {
    accessor: 'observacao',
    header: 'Observação',
    type: 'textArea',
    optional: true
  }
]
