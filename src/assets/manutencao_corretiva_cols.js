export const manutencaoCorretivaCols = [
  {
    accessor: 'dataRealizacao',
    header: 'Data da realização',
    type: 'date'
  },
  {
    accessor: 'exame',
    header: 'Exame',
    type: 'choice',
    choices: ['Choice1', 'Choice2', 'Choice3']
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
    type: 'text'
  },
  {
    accessor: 'numeroLaudo',
    header: 'Número do laudo',
    type: 'textNumber'
  },
  {
    accessor: 'realizado',
    header: 'Realizado',
    type: 'bool'
  }
]
