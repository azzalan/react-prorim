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
    accessor: 'acao',
    header: 'Ação',
    type: 'text'
  },
  {
    accessor: 'tecnico.firstName',
    header: 'Técnico',
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
    accessor: 'acao',
    header: 'Ação',
    type: 'text'
  },
  {
    accessor: 'tecnico',
    header: 'Técnico',
    type: 'choice',
    show: 'firstName',
    choicesUrl: 'tecnico/'
  }
]
