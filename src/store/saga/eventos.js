import { all, takeLatest, call, put, select } from 'redux-saga/effects'
import api from '../../services/api'

import { Creators as EventosAction } from '../duck/eventos'
import { Creators as LoginActions } from '../duck/login'

export function* getEventos(action) {
    try {

        const { token, user } = action.payload
        const params =  { ano: 2021 };
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
    try {
        const { token, evento } = action.payload;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`

            }
        }

        const response = yield call(api.get, `api/eventos/lista/desbravador/${evento.id}`, config)

        if (response.status == 200 && response.data.error == undefined) {
            let usuarios = response.data.usuarios;

            yield put(EventosAction.eventoUserSuccess(usuarios))
        }

    } catch (err) {
        console.log(err)
        yield put(LoginActions.loginFailure())
    }
}

export function* getUsersNotInEvent(action)
{
    try {
        const { token, evento } = action.payload;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`

            }
        }

        const response = yield call(api.get, `api/eventos/lista/desbravador/foraevento/${evento.id}`, config)

        if (response.status == 200 && response.data.error == undefined) {
            let usuarios = response.data;

            yield put(LoginActions.loginUsuarios(usuarios))
        }

    } catch (err) {
        yield put(LoginActions.loginFailure())
    }
}

export function* addDesbravadorEvent(action)
{
    try {
        const { token, evento, usuario_id } = action.payload
        const config = {
            headers: {
                Authorization: `Bearer ${token}`

            }
        }

        const response = yield call(api.get, `api/eventos/add/pontos/desbravador?user_id=${usuario_id}&event_id=${evento.id}&descricao=${evento.descricao}&pontos=${evento.ponto_evento}`, config)

        if (response.status == 200 && response.data.error == undefined) {

            yield put(EventosAction.eventoUserRequest(token, evento))
            yield put(EventosAction.eventoNotHaveUserRequest(token, evento))
        }

    } catch (err) {
        yield put(LoginActions.loginFailure())
    }
}

export function* addEvent(action)
{
    try {
        const { token, dados, user } = action.payload
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const formData = new FormData();
        formData.append('titulo', dados.titulo)
        formData.append('descricao', dados.descricao)
        formData.append('data_evento', dados.data_evento)
        formData.append('ponto_evento', dados.ponto_evento)

        const response = yield call(api.post, `api/eventos/add/evento`, formData, config)

        if (response.status == 200 && response.data.error == undefined) {
            yield put(EventosAction.eventoRequest(token, user))
        }

    } catch (err) {
        yield put(LoginActions.loginFailure())
    }
}
