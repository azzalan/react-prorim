import { combineReducers } from 'redux'
import TableDataReducer from './tableData'
import ActiveTableData from './active_table_data'

const rootReducer = combineReducers({
  tableData: TableDataReducer,
  activeTableData: ActiveTableData
})

export default rootReducer
