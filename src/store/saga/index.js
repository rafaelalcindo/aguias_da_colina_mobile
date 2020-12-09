import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import api from '../../services/api'

import navigate  from '../../services/navigation'

import { Creators as LoginActios, Types as LoginTypes } from '../duck/login'

function* login(action) {
    try {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        const { username, password } = action.payload;

        const formData = new FormData();
        formData.append('login', username)
        formData.append('password', password)

        const response = yield call(api.post, `api/auth/login`, formData, config)
        console.log(response)

        if (response.error == undefined) {
            
            yield put(LoginActios.loginSuccess({username, password, user : response.data.user, token: response.data.token}))
            navigate('Home')
        } else {
            yield put(LoginActios.loginFailure())
        }

    } catch (err) {
        console.log(err)
        yield put(LoginActios.loginFailure())
    }
}

export default function* rootSaga() {
    return yield all(
        [
            takeLatest(LoginTypes.REQUEST, login)
        ]
    )
}