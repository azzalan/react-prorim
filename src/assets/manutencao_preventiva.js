export const manutencaoPreventivaCols = [
  {
    header: 'Máquina',
    columns: [
      {
        accessor: 'maquina.numero',
        header: 'Nº',
        type: 'text',
        width: 50
      },
      {
        accessor: 'maquina.fabricante',
        header: 'Fabricante',
        type: 'text'
      }
    ]
  },
  {
    header: 'Jan',
    columns: [
      {
        accessor: 'janeiro',
        header: '',
        type: 'bool',
        width: 50
      },
      {
        accessor: 'dataJaneiro',
        header: '',
        type: 'date'
      }
    ]
  },
  {
    header: 'Fev',
    columns: [
      {
        accessor: 'fevereiro',
        header: '',
        type: 'bool',
        width: 50
      },
      {
        accessor: 'dataFevereiro',
        header: '',
        type: 'date'
      }
    ]
  },
  {
    header: 'Mar',
    columns: [
      {
        accessor: 'marco',
        header: '',
        type: 'bool',
        width: 50
      },
      {
        accessor: 'dataMarco',
        header: '',
        type: 'date'
      }
    ]
  },
  {
    header: 'Abr',
    columns: [
      {
        accessor: 'abril',
        header: '',
        type: 'bool',
        width: 50
      },
      {
        accessor: 'dataAbril',
        header: '',
        type: 'date'
      }
    ]
  },
  {
    header: 'Mai',
    columns: [
      {
        accessor: 'maio',
        header: '',
        type: 'bool',
        width: 50
      },
      {
        accessor: 'dataMaio',
        header: '',
        type: 'date'
      }
    ]
  },
  {
    header: 'Jun',
    columns: [
      {
        accessor: 'junho',
        header: '',
        type: 'bool',
        width: 50
      },
      {
        accessor: 'dataJunho',
        header: '',
        type: 'date'
      }
    ]
  },
  {
    header: 'Jul',
    columns: [
      {
        accessor: 'julho',
        header: '',
        type: 'bool',
        width: 50
      },
      {
        accessor: 'dataJulho',
        header: '',
        type: 'date'
      }
    ]
  },
  {
    header: 'Ago',
    columns: [
      {
        accessor: 'agosto',
        header: '',
        type: 'bool',
        width: 50
      },
      {
        accessor: 'dataAgosto',
        header: '',
        type: 'date'
      }
    ]
  },
  {
    header: 'Set',
    columns: [
      {
        accessor: 'setembro',
        header: '',
        type: 'bool',
        width: 50
      },
      {
        accessor: 'dataSetembro',
        header: '',
        type: 'date'
      }
    ]
  },
  {
    header: 'Out',
    columns: [
      {
        accessor: 'outubro',
        header: '',
        type: 'bool',
        width: 50
      },
      {
        accessor: 'dataOutubro',
        header: '',
        type: 'date'
      }
    ]
  },
  {
    header: 'Nov',
    columns: [
      {
        accessor: 'novembro',
        header: '',
        type: 'bool',
        width: 50
      },
      {
        accessor: 'dataNovembro',
        header: '',
        type: 'date'
      }
    ]
  },
  {
    header: 'Dez',
    columns: [
      {
        accessor: 'dezembro',
        header: '',
        type: 'bool',
        width: 50
      },
      {
        accessor: 'dataDezembro',
        header: '',
        type: 'date'
      }
    ]
  }
]

export const manutencaoPreventivaForm = [
  {
    accessor: 'janeiro',
    header: 'Janeiro',
    type: 'bool'
  },
  {
    accessor: 'dataJaneiro',
    header: 'Data janeiro',
    type: 'dateWithClear',
    optional: true
  },
  {
    accessor: 'fevereiro',
    header: 'Fevereiro',
    type: 'bool'
  },
  {
    accessor: 'dataFevereiro',
    header: 'Data fevereiro',
    type: 'dateWithClear',
    optional: true
  },
  {
    accessor: 'marco',
    header: 'Março',
    type: 'bool'
  },
  {
    accessor: 'dataMarco',
    header: 'Data março',
    type: 'dateWithClear',
    optional: true
  },
  {
    accessor: 'abril',
    header: 'Abril',
    type: 'bool'
  },
  {
    accessor: 'dataAbril',
    header: 'Data abril',
    type: 'dateWithClear',
    optional: true
  },
  {
    accessor: 'maio',
    header: 'Maio',
    type: 'bool'
  },
  {
    accessor: 'dataMaio',
    header: 'Data maio',
    type: 'dateWithClear',
    optional: true
  },
  {
    accessor: 'junho',
    header: 'Junho',
    type: 'bool'
  },
  {
    accessor: 'dataJunho',
    header: 'Data junho',
    type: 'dateWithClear',
    optional: true
  },
  {
    accessor: 'julho',
    header: 'Julho',
    type: 'bool'
  },
  {
    accessor: 'dataJulho',
    header: 'Data julho',
    type: 'dateWithClear',
    optional: true
  },
  {
    accessor: 'agosto',
    header: 'Agosto',
    type: 'bool'
  },
  {
    accessor: 'dataAgosto',
    header: 'Data agosto',
    type: 'dateWithClear',
    optional: true
  },
  {
    accessor: 'setembro',
    header: 'Setembro',
    type: 'bool'
  },
  {
    accessor: 'dataSetembro',
    header: 'Data setembro',
    type: 'dateWithClear',
    optional: true
  },
  {
    accessor: 'outubro',
    header: 'Outubro',
    type: 'bool'
  },
  {
    accessor: 'dataOutubro',
    header: 'Data outubro',
    type: 'dateWithClear',
    optional: true
  },
  {
    accessor: 'novembro',
    header: 'Novembro',
    type: 'bool'
  },
  {
    accessor: 'dataNovembro',
    header: 'Data novembro',
    type: 'dateWithClear',
    optional: true
  },
  {
    accessor: 'dezembro',
    header: 'Dezembro',
    type: 'bool'
  },
  {
    accessor: 'dataDezembro',
    header: 'Data dezembro',
    type: 'dateWithClear',
    optional: true
  }
]
