import { all, takeLatest, call, put, select } from 'redux-saga/effects'
import api from '../../services/api'

import { Creators as HoraPontosAction } from '../duck/horaPontos'
import { Creators as LoginActions } from '../duck/login'

export function* getHoraPontos(action) {

    try {

        const { token, user } = action.payload

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = yield call(api.get, `/api/hora_pontos/pegar_datas`, config)

        if (response.status == 200 && response.data.error == undefined) {

            let hora_pontos = response.data

            yield put (HoraPontosAction.horaPontoSuccess(hora_pontos))
        }

    } catch (err) {
        console.log(err)
        yield put (HoraPontosAction.horaPontoFailure())
    }
}

export function* getUserHoraPontos(action) {
    try {
        const { token, hora_ponto } = action.payload

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = yield call(api.get, `api/hora_pontos/detalhes/${hora_ponto.id}`, config)

        if (response.status == 200 && response.data.error == undefined) {
            let hora_pontos = response.data.hora_pontos;

            yield put(HoraPontosAction.horaPontoUserHoraPontosSuccess(hora_pontos))
        }

    } catch (err) {
        console.log(err)
        yield put(HoraPontosAction.horaPontoFailure())
    }
}

export function* getUserNotInHoraPonto(action)
{
    try {
        const { token, hora_ponto } = action.payload
        const config = {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        }

        const response = yield call(api.get, `api/hora_pontos/desbravador/forahoraponto/${hora_ponto.id}`, config)

        if (response.status == 200 && response.data.error == undefined) {
            let usuarios = response.data;

            yield put(LoginActions.loginUsuarios(usuarios))
        }

    } catch (err) {
        yield put(HoraPontosAction.horaPontoFailure())
    }
}

export function* addDesbravadorHoraPonto(action)
{
    try {
        const { token, hora_ponto, usuario_id } = action.payload
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = yield call(api.get, `api/hora_pontos/add/hora/desbravador?user_id=${usuario_id}&hora_ponto_id=${hora_ponto.id}`, config)

        if (response.status == 200 && response.data.error == undefined) {
            yield put (HoraPontosAction.horaPontoUserHoraPontosRequest(token, hora_ponto))
            yield put (HoraPontosAction.horaPontoNotHaveUserRequest(token, hora_ponto))
        }
    } catch (err) {
        yield put(LoginActions.loginFailure())
    }
}

export function* addHoraPonto(action)
{
    try {
        const { token, dados, user } = action.payload
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const formData = new FormData();
        formData.append('descricao', dados.descricao)
        formData.append('data_programacao', dados.data_programacao)
        formData.append('hora_programacao', dados.hora_programacao)
        formData.append('pontos', dados.pontos)

        const response = yield call(api.post, `api/hora_pontos/add/hora_ponto`, formData, config)

        if (response.status == 200 && response.data.error == undefined) {
            yield put(HoraPontosAction.horaPontoRequest(token, user))
        }

    } catch (err) {
        console.log(err)
        yield put(HoraPontosAction.horaPontoFailure())
    }
}
