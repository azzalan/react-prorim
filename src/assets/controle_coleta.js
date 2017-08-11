export const controleColetaCols = [
  {
    accessor: 'dataRealizado',
    header: 'Data da realização',
    type: 'date'
  },
  {
    accessor: 'exame.nome',
    header: 'Exame',
    type: 'text'
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
    accessor: 'observacao',
    header: 'Observação',
    type: 'text'
  }
]

export const controleColetaForm = [
  {
    accessor: 'dataRealizado',
    header: 'Data da realização',
    type: 'date'
  },
  {
    accessor: 'exame',
    header: 'Exame',
    type: 'choice',
    show: 'nome',
    choicesUrl: 'choice-exame-coleta/'
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
    accessor: 'resultado',
    header: 'Resultado',
    type: 'choice',
    show: 'nome',
    choicesUrl: 'choice-resultado-agua/'
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
    accessor: 'observacao',
    header: 'Observação',
    type: 'textArea',
    optional: true
  }
]
