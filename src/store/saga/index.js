import { all, takeLatest } from 'redux-saga/effects'

import { Types as LoginTypes } from '../duck/login'
import { Types as PontosIndividuaisTypes } from '../duck/pontosIndividuais'
import { Types as PontosUnidadesTypes } from '../duck/pontosUnidades'
import { Types as EspecialidadesTypes } from '../duck/especialidades'
import { Types as EventosTypes } from '../duck/eventos'
import { Types as HoraPontosTypes } from '../duck/horaPontos'

import { login, checkUser, logOutUser } from './login'
import { getPoints } from './pontosIndividuais'
import { getUnityPoints } from './pontosUnidades'
import { getEspecialidades } from './especialidades'
import { getEventos, getUsersEventos, getUsersNotInEvent, addDesbravadorEvent, addEvent } from './eventos'
import { getHoraPontos, getUserHoraPontos, getUserNotInHoraPonto, addDesbravadorHoraPonto, addHoraPonto } from './horaPontos'

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
            takeLatest(EventosTypes.USER_EVENT_REQUEST, getUsersEventos),
            takeLatest(EventosTypes.USER_NOT_EVENT_REQUEST, getUsersNotInEvent),
            takeLatest(EventosTypes.SAVE_USER_EVENT, addDesbravadorEvent),
            takeLatest(EventosTypes.ADD_EVENT_REQUEST, addEvent),

            takeLatest(HoraPontosTypes.REQUEST, getHoraPontos),
            takeLatest(HoraPontosTypes.REQUEST_USER_HORAPONTO, getUserHoraPontos),
            takeLatest(HoraPontosTypes.USER_NOT_HORAPONTO_REQUEST, getUserNotInHoraPonto),
            takeLatest(HoraPontosTypes.SAVE_USER_HORAPONTO, addDesbravadorHoraPonto),
            takeLatest(HoraPontosTypes.ADD_HORAPONTO_REQUEST, addHoraPonto)
        ]
    )
}
