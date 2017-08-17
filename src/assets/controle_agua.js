export const controleAguaCols = [
  {
    accessor: 'data',
    header: 'Data',
    type: 'date'
  },
  {
    accessor: 'resultado',
    header: 'Satisfatório',
    type: 'bool'
  },
  {
    accessor: 'numeroDoLaudo',
    header: 'Número do laudo',
    type: 'text'
  },
  {
    accessor: 'teste',
    header: 'Teste',
    type: 'text'
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
    accessor: 'resultado',
    header: 'Satisfatório',
    type: 'bool'
  },
  {
    accessor: 'numeroDoLaudo',
    header: 'Número do laudo',
    type: 'text'
  },
  {
    accessor: 'teste',
    header: 'Teste',
    type: 'textArea'
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
    type: 'text',
    optional: true
  }
]
