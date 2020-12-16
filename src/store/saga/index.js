import { all, takeLatest } from 'redux-saga/effects'

import { Types as LoginTypes } from '../duck/login'
import { Types as PontosIndividuaisTypes } from '../duck/pontosIndividuais'

import { login, checkUser, logOutUser } from './login'
import { getPoints } from './pontosIndividuais'

export default function* rootSaga() {
    return yield all(
        [
            takeLatest(LoginTypes.REQUEST, login),
            takeLatest(LoginTypes.CHECK, checkUser),
            takeLatest(LoginTypes.LOGOUT, logOutUser),
            takeLatest(PontosIndividuaisTypes.REQUEST, getPoints)
        ]
    )
}