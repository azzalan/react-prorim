import { combineReducers } from 'redux'
import ActiveTableData from './active_table_data'
import ActiveTable from './active_table'
import Log from './log'
import FilterData from './filter_data'
import DisableAddButton from './disable_add_button'

const rootReducer = combineReducers({
  activeTableData: ActiveTableData,
  activeTable: ActiveTable,
  log: Log,
  filterData: FilterData,
  disableAddButton: DisableAddButton
})

export default rootReducer
