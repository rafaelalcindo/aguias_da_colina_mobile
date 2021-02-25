/**
 * Actions Types
 */
export const Types = {
    REQUEST: 'HORAPONTOS_REQUEST',
    SUCCESS: 'HORAPONTOS_SUCCESS',
    FAILURE: 'HORAPONTOS_FAILURE',
    REQUEST_USER_HORAPONTO: 'REQUEST_USER_HORAPONTO',
    ADD_USER_HORAPONTO: 'ADD_USER_HORAPONTO',
    USER_NOT_HORAPONTO_REQUEST: 'USER_NOT_HORAPONTO_REQUEST',
    SAVE_USER_HORAPONTO: 'SAVE_USER_HORAPONTO',
    ADD_HORAPONTO_REQUEST: 'ADD_HORAPONTO_REQUEST'
}

/**
 * Reducers
 */
const INITIAL_STATE = {
    hora_pontos: null,
    loading: false,
    error: false,
    user_hora_pontos: []
}

export default function horaPontos(state = INITIAL_STATE, action) {
    switch(action.type) {
        case Types.REQUEST:
            return { ...state, loading: true }
        case Types.SUCCESS:
            return {
                ...state,
                hora_pontos: action.payload.hora_pontos,
                loading: false,
                error: false
            }
        case Types.FAILURE:
            return {
                ...state,
                error: true,
                loading: false
            }
        case Types.REQUEST_USER_HORAPONTO:
            return {
                ...state,
                loading: true
            }
        case Types.ADD_USER_HORAPONTO:
            return {
                ...state,
                user_hora_pontos: action.payload.user_hora_pontos
            }
        case Types.USER_NOT_HORAPONTO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case Types.SAVE_USER_HORAPONTO:
            return { ...state, loading: true }
        case Types.ADD_HORAPONTO_REQUEST:
            return { ...state, loading: true }
        default:
            return state
    }
}

/**
 * Actions Creators
 */
export const Creators = {
    horaPontoRequest: (token, user) => ({
        type: Types.REQUEST,
        payload: { token, user }
    }),

    horaPontoSuccess: (hora_pontos) => ({
        type: Types.SUCCESS,
        payload: { hora_pontos }
    }),

    horaPontoFailure: () => ({
        type: Types.FAILURE
    }),

    horaPontoUserHoraPontosRequest: (token, hora_ponto) => ({
        type: Types.REQUEST_USER_HORAPONTO,
        payload: { token, hora_ponto }
    }),

    horaPontoUserHoraPontosSuccess: (user_hora_pontos) => ({
        type: Types.ADD_USER_HORAPONTO,
        payload: { user_hora_pontos }
    }),

    horaPontoNotHaveUserRequest: (token, hora_ponto) => ({
        type: Types.USER_NOT_HORAPONTO_REQUEST,
        payload: { token, hora_ponto }
    }),

    horaPontoSaveUser: (token, hora_ponto, usuario_id) => ({
        type: Types.SAVE_USER_HORAPONTO,
        payload: { token, hora_ponto, usuario_id }
    }),

    horaPontoAdd: (token, dados, user) => ({
        type: Types.ADD_HORAPONTO_REQUEST,
        payload: { token, dados, user }
    })
}
