export const gestaoEnfermagemCols = [
  {
    header: '',
    columns: [
      {
        accessor: 'data',
        header: 'Data',
        type: 'date',
        filter: true,
        hideTable: true,
        hideForm: true,
        required: true
      },
      {
        accessor: 'periodo',
        header: 'Periodo',
        type: 'obj',
        show: 'nome',
        choicesUrl: 'choice-periodo-turno/',
        filter: true,
        hideTable: true,
        hideForm: true,
        required: true
      },
      {
        accessor: 'sala',
        header: 'Sala',
        type: 'obj',
        show: 'identificador',
        choicesUrl: 'sala/',
        filter: true,
        hideTable: true,
        hideForm: true,
        required: true
      },
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
      }
    ]
  },
  {
    header: 'Erro',
    optional: true,
    accessor: 'erro',
    columns: [
      {
        accessor: 'erro',
        type: 'erro',
        hideTable: true,
        hideForm: true,
        requiredEdit: true
      },
      {
        accessor: 'erro.numero',
        depth: 1,
        header: 'Número do erro',
        type: 'textNumber'
      },
      {
        accessor: 'erro.observacao',
        depth: 1,
        header: 'Observação',
        type: 'text'
      },
      {
        accessor: 'erro.ocorrido',
        depth: 1,
        header: 'Ocorrido',
        type: 'date'
      },
      {
        accessor: 'erro.concluido',
        depth: 1,
        header: 'Concluído',
        type: 'date'
      },
      {
        accessor: 'erro.enfermeiro',
        depth: 1,
        show: 'firstName',
        header: 'Enfermeiro',
        type: 'obj',
        choicesUrl: 'enfermeiro/'
      },
      {
        accessor: 'erro.maquina',
        depth: 1,
        show: 'numero',
        header: 'Número da máquina',
        type: 'obj',
        choicesUrl: 'maquina/'
      }
    ]
  }
]
