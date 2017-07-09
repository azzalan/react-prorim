export const controleAguaCols = [
  {
    accessor: 'data',
    header: 'Data',
    type: 'date'
  },
  {
    accessor: 'teste.nome',
    header: 'Teste',
    type: 'text'
  },
  {
    accessor: 'resultado',
    header: 'Satisfatório',
    type: 'bool'
  },
  {
    accessor: 'numeroDoLaudo',
    header: 'Número do laudo',
    type: 'textNumber'
  },
  {
    accessor: 'arquivoResultado',
    header: 'Arquivo',
    type: 'file'
  }
]

export const controleAguaForm = [
  {
    accessor: 'data',
    header: 'Data',
    type: 'date'
  },
  {
    accessor: 'teste',
    show: 'nome',
    header: 'Teste',
    type: 'choice',
    choicesUrl: 'choice-teste-agua/'
  },
  {
    accessor: 'resultado',
    header: 'Satisfatório',
    type: 'bool'
  },
  {
    accessor: 'numeroDoLaudo',
    header: 'Número do laudo',
    type: 'textNumber'
  },
  {
    accessor: 'arquivoResultado',
    header: 'Arquivo',
    type: 'file'
  }
]

export const controleAguaFilter = [
  {
    accessor: 'numeroDoLaudo',
    header: 'Número do laudo',
    type: 'textNumber',
    optional: true
  }
]
