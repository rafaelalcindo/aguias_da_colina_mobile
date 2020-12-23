import { all, takeLatest, call, put, select } from 'redux-saga/effects'
import api from '../../services/api'

import { Creators as EventosAction } from '../duck/eventos'
import { Creators as LoginActions } from '../duck/login'

export function* getEventos(action) {
    try {

        const { token, user } = action.payload
        const params =  { ano: 2020 };
        const config = {
            headers: {
                Authorization: `Bearer ${token}`

            }
        }

        const response = yield call(api.get, `/api/eventos?ano=${2020}`, config)

        if (response.status == 200 && response.data.error == undefined) {
            let eventos = response.data;

            yield put (EventosAction.eventoSuccess(eventos))
        }

    } catch (err) {
        console.log(err)
        yield put(LoginActions.loginFailure())
    }
}

export function* getUsersEventos(action) {

}
