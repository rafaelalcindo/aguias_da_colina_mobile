import { all, takeLatest, call, put, select } from 'redux-saga/effects'
import api from '../../services/api'

import { Creators as EspecialidadesAction } from '../duck/especialidades'
import { Creators as LoginActions } from '../duck/login'

export function* getEspecialidades(action) {
    try {

        const { token, user } = action.payload;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = yield call(api.get, `api/especialidades/lista/${user.id}`, config)

        if (response.status == 200 && response.data.error == undefined) {
            let especialidades = response.data;

            yield put(EspecialidadesAction.especialidadeSuccess(especialidades))
        }

    } catch (err) {
        console.log(err)
        yield put(LoginActions.loginFailure())
    }
}
