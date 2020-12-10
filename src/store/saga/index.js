import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import api from '../../services/api'

import AsyncStorage from '@react-native-community/async-storage'
import { navigate } from '../../services/navigation'

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

        if (response.status == 200 && response.data.error == undefined) {

            let user = response.data.user;
            let token = response.data.token.access_token;
            
            yield put(LoginActios.loginSuccess(username, password, user, token))
            
            
        } else {
            yield put(LoginActios.loginFailure())
        }

    } catch (err) {
        console.log(err)
        yield put(LoginActios.loginFailure())
    }
}

function* checkUser(action) {
    try {
        const { token } = action.payload;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        const response = yield call(api.get, `api/auth/me`, config)

        if (response.data.id != undefined) {
            yield put(LoginActios.loginAuthUser(response.data))
            navigate('Home')
        } else {
            
            yield put(LoginActios.loginLogout())
        }
        
    } catch (err) {
        console.log(err)
        yield put(LoginActios.loginLogout())
    }
}

function* logOutUser(action) {
    yield AsyncStorage.clear()
}

export default function* rootSaga() {
    return yield all(
        [
            takeLatest(LoginTypes.REQUEST, login),
            takeLatest(LoginTypes.CHECK, checkUser),
            takeLatest(LoginTypes.LOGOUT, logOutUser)
        ]
    )
}