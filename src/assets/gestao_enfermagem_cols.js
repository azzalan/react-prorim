export const gestaoEnfermagemCols = [
  {
    accessor: 'numeroDaMaca',
    header: 'Número da maca',
    type: 'textNumber'
  },
  {
    accessor: 'paciente',
    header: 'Paciente',
    type: 'text'
  },
  {
    accessor: 'inicio',
    header: 'Início',
    type: 'date'
  },
  {
    accessor: 'fim',
    header: 'Fim',
    type: 'date'
  },
  {
    accessor: 'erro.numero',
    header: 'Número do erro',
    type: 'textNumber'
  },
  {
    accessor: 'erro.observacao',
    header: 'Observação',
    type: 'text'
  },
  {
    accessor: 'erro.ocorrido',
    header: 'Ocorrido',
    type: 'date'
  },
  {
    accessor: 'erro.concluido',
    header: 'Concluído',
    type: 'date'
  },
  {
    accessor: 'erro.enfermeiro',
    header: 'Enfermeiro',
    type: 'obj',
    show: 'firstName',
    choicesUrl: 'enfermeiro/'
  },
  {
    accessor: 'erro.maquina',
    header: 'Número da máquina',
    type: 'obj',
    show: 'numero',
    choicesUrl: 'maquina/'
  }
]
