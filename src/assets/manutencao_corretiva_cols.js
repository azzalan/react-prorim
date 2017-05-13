export const manutencaoCorretivaCols = [
  {
    accessor: 'data',
    header: 'Data',
    type: 'date'
  },
  {
    accessor: 'erro.estadia.turno.sala.identificador',
    header: 'Sala',
    type: 'text',
    readOnly: true
  },
  {
    accessor: 'erro',
    header: 'Número do erro',
    type: 'obj',
    show: 'numero',
    readOnly: true,
    readOnlyButRequired: true
  },
  {
    accessor: 'erro.maquina.numero',
    header: 'Número da máquina',
    type: 'text',
    readOnly: true
  },
  {
    accessor: 'erro.enfermeiro.firstName',
    header: 'Enfermeiro',
    type: 'text',
    readOnly: true
  },
  {
    accessor: 'acao',
    header: 'Ação',
    type: 'text'
  },
  {
    accessor: 'tecnico',
    header: 'Técnico',
    type: 'obj',
    show: 'firstName'
  }
]
