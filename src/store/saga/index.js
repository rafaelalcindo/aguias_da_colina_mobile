import { all, takeLatest } from 'redux-saga/effects'

import { Types as LoginTypes } from '../duck/login'
import { Types as PontosIndividuaisTypes } from '../duck/pontosIndividuais'
import { Types as PontosUnidadesTypes } from '../duck/pontosUnidades'
import { Types as EspecialidadesTypes } from '../duck/especialidades'
import { Types as EventosTypes } from '../duck/eventos'

import { login, checkUser, logOutUser } from './login'
import { getPoints } from './pontosIndividuais'
import { getUnityPoints } from './pontosUnidades'
import { getEspecialidades } from './especialidades'
import { getEventos, getUsersEventos } from './eventos'

export default function* rootSaga() {
    return yield all(
        [
            takeLatest(LoginTypes.REQUEST, login),
            takeLatest(LoginTypes.CHECK, checkUser),
            takeLatest(LoginTypes.LOGOUT, logOutUser),

            takeLatest(PontosIndividuaisTypes.REQUEST, getPoints),
            takeLatest(PontosUnidadesTypes.REQUEST, getUnityPoints),
            takeLatest(EspecialidadesTypes.REQUEST, getEspecialidades),

            takeLatest(EventosTypes.REQUEST, getEventos),
            takeLatest(EventosTypes.USER_EVENT_REQUEST, getUsersEventos)
        ]
    )
}
