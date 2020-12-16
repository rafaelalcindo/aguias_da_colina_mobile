import { all, takeLatest, call, put, select } from 'redux-saga/effects'
import api from '../../services/api'

import { Creators as PontosUnidadesAction } from '../duck/pontosUnidades'
import { Creators as LoginActions } from '../duck/login'

export function* getUnityPoints(action) {
    try {
        
        const { token, user } = action.payload;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = yield call(api.get, `api/pontounidade/usuario/${user.id}`, config)

        if (response.status == 200 && response.data.error == undefined) {
            let pontos_unidade = response.data;

            yield put(PontosUnidadesAction.userUnityPointSuccess(pontos_unidade))
        }

    } catch (err) {
        console.log(err)
        yield put(LoginActions.loginFailure())
    }
}
