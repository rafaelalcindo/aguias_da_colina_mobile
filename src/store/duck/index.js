import { combineReducers } from 'redux'

import login from './login'
import pontosIndividuais from './pontosIndividuais'

export default combineReducers({
    login,
    pontosIndividuais
})