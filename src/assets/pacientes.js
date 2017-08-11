import React from 'react'
import AgendamentosCell from '../containers/agendamentos_cell'

export const pacientesCols = [
  {
    accessor: 'nome',
    header: 'Nome',
    type: 'text'
  },
  {
    accessor: 'cpf',
    header: 'CPF',
    type: 'text'
  },
  {
    accessor: 'convenio',
    header: 'Convênio',
    type: 'text'
  },
  {
    accessor: 'status.nome',
    header: 'Status',
    type: 'text'
  },
  {
    accessor: '',
    header: 'Agendamentos',
    clickable: true,
    render: row => (
      <span
      >
        <AgendamentosCell
          row={row}
          type='list'
        />
      </span>
    )
  },
  {
    accessor: '',
    header: 'Agendar',
    clickable: true,
    render: row => (
      <span
      >
        <AgendamentosCell
          row={row}
          type='add'
        />
      </span>
    )
  }
]

export const pacientesForm = [
  {
    accessor: 'nome',
    header: 'Nome',
    type: 'text'
  },
  {
    accessor: 'cpf',
    header: 'CPF',
    type: 'cpf'
  },
  {
    accessor: 'convenio',
    header: 'Convênio',
    type: 'text'
  },
  {
    accessor: 'status',
    header: 'Status',
    type: 'choice',
    show: 'nome',
    choicesUrl: 'choice-status-paciente/'
  }
]

export const pacientesFilter = [
  {
    header: 'Nome',
    accessor: 'searchNome',
    type: 'text',
    optional: true
  }
]

export const searchFormFields = [
  {
    header: 'Nome',
    accessor: 'searchNome',
    type: 'text'
  }
]

export const searchListCols = [
  {
    header: 'Selecionar pacientes',
    accessor: 'nome',
    type: 'text'
  }
]

export const listToAddCols = [
  {
    header: 'Pacientes à adicionar',
    accessor: 'nome',
    type: 'text'
  }
]

export const listToRemoveCols = [
  {
    accessor: 'secao.data',
    header: 'Data',
    type: 'date'
  },
  {
    accessor: 'secao.periodo.nome',
    header: 'Periodo',
    type: 'text'
  },
  {
    accessor: 'secao.sala.identificador',
    header: 'Sala',
    type: 'text'
  },
  {
    accessor: '',
    header: 'Desmarcar',
    clickable: true,
    render: row => (
      <span
      >
        <AgendamentosCell
          row={row}
          type='remove'
        />
      </span>
    )
  }
]

export const agendarFields = [
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

export const agendarCols = [
  {
    accessor: 'data',
    header: 'Data',
    type: 'date'
  },
  {
    accessor: 'periodo.nome',
    header: 'Período',
    type: 'text'
  },
  {
    accessor: 'sala.identificador',
    header: 'Sala',
    type: 'text'
  }
]
