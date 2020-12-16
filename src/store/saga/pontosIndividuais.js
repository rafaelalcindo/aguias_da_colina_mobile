import { all, takeLatest, call, put, select } from 'redux-saga/effects'
import api from '../../services/api'
import { navigate } from '../../services/navigation'

import { Creators as PontosIndividuaisActions } from '../duck/pontosIndividuais'
import { Creators as LoginActios } from '../duck/login'

export function* getPoints(action) {
    try {
        const { token, user } = action.payload;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
                
            }
        }


        const response = yield call(api.get, `/api/pontousuario/usuario/${user.id}`, config)

        if (response.status == 200 && response.data.error == undefined) {
            let pontos = response.data;
            
            yield put(PontosIndividuaisActions.userPointSuccess(pontos))            
        } else {
            // yield put(PontosIndividuaisActions.userPointFailure())
            yield put(LoginActios.loginFailure())
        }
    } catch (err) {
        console.log(err)
        // yield put(PontosIndividuaisActions.userPointFailure())
        yield put(LoginActios.loginFailure())
    }
}