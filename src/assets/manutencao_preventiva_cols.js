export const manutencaoPreventivaCols = [
  {
    accessor: 'maquina.numero',
    header: 'Número da máquina',
    type: 'choice',
    choices: ['1', '2', '3']
  },
  {
    accessor: 'maquina.fabricante',
    header: 'Fabricante',
    type: 'choice',
    choices: ['Fabricante1', 'Fabricante2', 'Fabricante3'],
    readOnly: true
  },
  {
    accessor: 'janeiro',
    header: 'Janeiro',
    type: 'bool'
  },
  {
    accessor: 'fevereiro',
    header: 'Fevereiro',
    type: 'bool'
  },
  {
    accessor: 'marco',
    header: 'Março',
    type: 'bool'
  },
  {
    accessor: 'abril',
    header: 'Abril',
    type: 'bool'
  },
  {
    accessor: 'maio',
    header: 'Maio',
    type: 'bool'
  },
  {
    accessor: 'junho',
    header: 'Junho',
    type: 'bool'
  },
  {
    accessor: 'julho',
    header: 'Julho',
    type: 'bool'
  },
  {
    accessor: 'agosto',
    header: 'Agosto',
    type: 'bool'
  },
  {
    accessor: 'setembro',
    header: 'Setembro',
    type: 'bool'
  },
  {
    accessor: 'outubro',
    header: 'Outubro',
    type: 'bool'
  },
  {
    accessor: 'novembro',
    header: 'Novembro',
    type: 'bool'
  },
  {
    accessor: 'dezembro',
    header: 'Dezembro',
    type: 'bool'
  }
]
