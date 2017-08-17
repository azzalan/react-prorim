export const controleColetaCols = [
  {
    accessor: 'exame.nome',
    header: 'Exame',
    type: 'text'
  },
  {
    accessor: 'numeroDoLaudo',
    header: 'Número do laudo',
    type: 'text'
  },
  {
    accessor: 'realizado',
    header: 'Realizado',
    type: 'bool'
  },
  {
    accessor: 'dataRealizado',
    header: 'Data da realização',
    type: 'date'
  },
  {
    accessor: 'dataEnvio',
    header: 'Data do envio',
    type: 'date'
  },
  {
    accessor: 'dataResultado',
    header: 'Data do resultado',
    type: 'date'
  },
  {
    accessor: 'resultado.nome',
    header: 'Resultado',
    type: 'text'
  },
  {
    accessor: 'observacao',
    header: 'Observação',
    type: 'text'
  }
]

export const controleColetaForm = [
  {
    accessor: 'exame',
    header: 'Exame',
    type: 'choice',
    show: 'nome',
    choicesUrl: 'choice-exame-coleta/'
  },
  {
    accessor: 'numeroDoLaudo',
    header: 'Número do laudo',
    type: 'text'
  },
  {
    accessor: 'realizado',
    header: 'Realizado',
    type: 'bool'
  },
  {
    accessor: 'dataRealizado',
    header: 'Data da realização',
    type: 'date',
    optional: true
  },
  {
    accessor: 'dataEnvio',
    header: 'Data do envio',
    type: 'date',
    optional: true
  },
  {
    accessor: 'dataResultado',
    header: 'Data do resultado',
    type: 'date',
    optional: true
  },
  {
    accessor: 'resultado',
    header: 'Resultado',
    type: 'choice',
    show: 'nome',
    choicesUrl: 'choice-resultado-agua/',
    optional: true
  },
  {
    accessor: 'observacao',
    header: 'Observação',
    type: 'textArea',
    optional: true
  }
]
