import changeStatus from './logreducer'
import { combineReducers } from 'redux'
import changeCount from './updatereducer'



const rootReducer = combineReducers({
          changeStatus,
          changeCount
          
})



export default rootReducer