export const manutencaoCorretivaCols = [
  {
    accessor: 'erro.maquina.sala.identificador',
    header: 'Sala',
    type: 'text'
  },
  {
    accessor: 'erro.numero',
    header: 'Número do erro',
    type: 'text'
  },
  {
    accessor: 'erro.maquina.numero',
    header: 'Número da máquina',
    type: 'text'
  },
  {
    accessor: 'erro.enfermeiro.firstName',
    header: 'Enfermeiro',
    type: 'text'
  },
  {
    accessor: 'data',
    header: 'Data',
    type: 'date'
  },
  {
    accessor: 'tecnico.firstName',
    header: 'Técnico',
    type: 'text'
  },
  {
    accessor: 'acao',
    header: 'Ação',
    type: 'text'
  }
]

export const manutencaoCorretivaForm = [
  {
    accessor: 'data',
    header: 'Data',
    type: 'date'
  },
  {
    accessor: 'tecnico',
    header: 'Técnico',
    type: 'choice',
    show: 'firstName',
    choicesUrl: 'tecnico/'
  },
  {
    accessor: 'acao',
    header: 'Ação',
    type: 'textArea'
  }
]
