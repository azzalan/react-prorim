export const controleAguaCols = [
  {
    accessor: 'data',
    header: 'Data',
    type: 'date'
  },
  {
    accessor: 'teste',
    header: 'Teste',
    type: 'obj',
    show: 'nome',
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
