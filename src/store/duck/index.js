import { combineReducers } from 'redux'

import login from './login'
import pontosIndividuais from './pontosIndividuais'
import pontosUnidades from './pontosUnidades'
import especialidades from './especialidades'
import eventos from './eventos'

export default combineReducers({
    login,
    pontosIndividuais,
    pontosUnidades,
    especialidades,
    eventos
})
