import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import api from '../../services/api'

import AsyncStorage from '@react-native-community/async-storage'
import { navigate } from '../../services/navigation'

import { Creators as LoginActios } from '../duck/login'

export function* login(action) {
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

export function* checkUser(action) {
    try {
        const { token } = action.payload;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        const response = yield call(api.get, `api/auth/me`, config)

        if (response.data.id != undefined) {
            let user = response.data

            yield put(LoginActios.loginAuthUser(user))
        } else {
            yield put(LoginActios.loginLogout())
            navigate('Login')
        }

    } catch (err) {
        console.log(err)
        yield put(LoginActios.loginLogout())
        navigate('Login')
    }
}

export function* logOutUser(action) {
    yield AsyncStorage.clear()
    navigate('Login')
}
