import { combineReducers } from 'redux'
import ActiveTableData from './active_table_data'
import ActiveTable from './active_table'
import Log from './log'
import FilterData from './filter_data'
import DisableAddButton from './disable_add_button'
import GroupInputOpen from './group_input_open'
import DialogEditValues from './dialog_edit_values'
import Choices from './choices'
import ModelDisplay from './model_display'
import MenuLeftOpen from './menu_left_open'
import ModelData from './model_data'
import ListToAddData from './list_to_add_data'
import DialogAddIsOpen from './dialog_add_is_open'
import DialogEditIsOpen from './dialog_edit_is_open'
import DialogAddAgendamentosIsOpen from './dialog_add_agend_is_open'
import DialogAgendamentosIsOpen from './dialog_agendamentos_is_open'
import DialogAgendamentosData from './dialog_agendamentos_data'
import DialogAddAgendamentosData from './dialog_add_agendamentos_data'
import ActiveFormData from './form_data'
import UserData from './user_data'

const rootReducer = combineReducers({
  activeTableData: ActiveTableData,
  activeTable: ActiveTable,
  authToken: Log,
  filterData: FilterData,
  disableAddButton: DisableAddButton,
  groupInputOpen: GroupInputOpen,
  dialogEditValues: DialogEditValues,
  choices: Choices,
  modelDisplay: ModelDisplay,
  menuLeftOpen: MenuLeftOpen,
  modelData: ModelData,
  listToAddData: ListToAddData,
  dialogAddIsOpen: DialogAddIsOpen,
  dialogEditIsOpen: DialogEditIsOpen,
  dialogAddAgendamentosIsOpen: DialogAddAgendamentosIsOpen,
  dialogAgendamentosIsOpen: DialogAgendamentosIsOpen,
  dialogAgendamentosData: DialogAgendamentosData,
  formData: ActiveFormData,
  dialogAddAgendamentosData: DialogAddAgendamentosData,
  userData: UserData
})

export default rootReducer
