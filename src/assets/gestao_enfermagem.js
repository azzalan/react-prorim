export const gestaoEnfermagemCols = [
  {
    header: '',
    columns: [
      {
        accessor: 'paciente.nome',
        header: 'Paciente',
        type: 'text'
      },
      {
        accessor: 'numeroDaMaca',
        header: 'Número do leito',
        type: 'text'
      },
      {
        accessor: 'inicio',
        header: 'Início',
        type: 'time'
      },
      {
        accessor: 'fim',
        header: 'Fim',
        type: 'time'
      },
      {
        accessor: 'status.nome',
        header: 'Status',
        type: 'text'
      }
    ]
  },
  {
    header: 'Erro',
    columns: [
      {
        accessor: 'erro.numero',
        header: 'Número do erro',
        type: 'text'
      },
      {
        accessor: 'erro.ocorrido',
        header: 'Ocorrido',
        type: 'time'
      },
      {
        accessor: 'erro.concluido',
        header: 'Concluído',
        type: 'time'
      },
      {
        accessor: 'erro.enfermeiro.firstName',
        header: 'Enfermeiro',
        type: 'text'
      },
      {
        accessor: 'erro.maquina.numero',
        header: 'Número da máquina',
        type: 'text'
      },
      {
        accessor: 'erro.manutencaoCorretiva.status.nome',
        header: 'Status',
        type: 'text'
      },
      {
        accessor: 'erro.observacao',
        header: 'Observação',
        type: 'text'
      }
    ]
  }
]

export const gestaoEnfermagemForm = [
  {
    accessor: 'numeroDaMaca',
    header: 'Número do leito',
    type: 'text',
    optional: true
  },
  {
    accessor: 'inicio',
    header: 'Início',
    type: 'time',
    optional: true
  },
  {
    accessor: 'fim',
    header: 'Fim',
    type: 'time',
    optional: true
  },
  {
    accessor: 'status',
    header: 'Status',
    type: 'choice',
    show: 'nome',
    choicesUrl: 'choice-status-estadia/',
    optional: true
  },
  {
    accessor: 'erro',
    header: 'Erro',
    fields: [
      {
        accessor: 'erro.numero',
        header: 'Número do erro',
        type: 'text'
      },
      {
        accessor: 'erro.ocorrido',
        header: 'Ocorrido',
        type: 'time'
      },
      {
        accessor: 'erro.concluido',
        header: 'Concluído',
        type: 'time',
        optional: true
      },
      {
        accessor: 'erro.enfermeiro',
        show: 'firstName',
        header: 'Enfermeiro',
        type: 'choice',
        choicesUrl: 'enfermeiro/',
        optional: true
      },
      {
        accessor: 'erro.maquina',
        show: 'numero',
        header: 'Número da máquina',
        type: 'choice',
        choicesUrl: 'maquina/'
      },
      {
        accessor: 'erro.observacao',
        header: 'Observação',
        type: 'textArea',
        optional: true
      }
    ]
  }
]

export const gestaoEnfermagemFilter = [
  {
    accessor: 'data',
    header: 'Data',
    type: 'date'
  },
  {
    accessor: 'periodo',
    header: 'Período',
    type: 'choice',
    show: 'nome',
    choicesUrl: 'choice-periodo-turno/'
  },
  {
    accessor: 'sala',
    header: 'Sala',
    type: 'choice',
    show: 'identificador',
    choicesUrl: 'sala/'
  }
]

export const enfermeiroField = {
  accessor: 'enfermeiro',
  show: 'firstName',
  header: 'Enfermeiro',
  type: 'choice',
  choicesUrl: 'enfermeiro/',
  optional: true
}
