import { combineReducers } from 'redux'
import ActiveTableData from './active_table_data'
import ActiveTable from './active_table'
import Log from './log'

const rootReducer = combineReducers({
  activeTableData: ActiveTableData,
  activeTable: ActiveTable,
  log: Log
})

export default rootReducer
