/**
 * Actions Types
 */
export const Types = {
    REQUEST: 'EVENTOS_REQUEST',
    SUCCESS: 'EVENTOS_SUCCESS',
    FAILURE: 'EVENTOS_FAILURE',
    USER_EVENT_REQUEST: 'EVENTOS_USER_REQUEST',
    USER_EVENT_SUCCESS: 'EVENTOS_USER_SUCCESS',
    USER_NOT_EVENT_REQUEST: 'USER_NOT_EVENT_REQUEST',
    SAVE_USER_EVENT: 'SAVE_USER_EVENT',
    ADD_EVENT_REQUEST: 'ADD_EVENT_REQUEST'
}

/**
 * Reducers
 */
const INITIAL_STATE = {
    eventos: null,
    loading: false,
    error: false,
    evento_usuarios: []
}

export default function eventos(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.REQUEST:
            return { ...state, loading: true }
        case Types.SUCCESS:
            return {
                ...state,
                eventos: action.payload.eventos,
                loading: false,
                error: false
            }
        case Types.FAILURE:
            return { ...state, error: true, loading: false }

        case Types.USER_EVENT_REQUEST:
            return { ...state, loading: true }

        case Types.USER_EVENT_SUCCESS:
            return { ...state, evento_usuarios: action.payload.evento_usuarios, loading: false }

        case Types.USER_NOT_EVENT_REQUEST:
            return { ...state, loading: true }

        case Types.SAVE_USER_EVENT:
            return { ...state, loading: true }

        case Types.ADD_EVENT_REQUEST:
            return { ...state, loading: true }

        default:
            return state;
    }
}

/**
 * Actions Creators
 */
export const Creators = {
    eventoRequest: (token, user) => ({
        type: Types.REQUEST,
        payload: { token, user }
    }),

    eventoSuccess: (eventos) => ({
        type: Types.SUCCESS,
        payload: { eventos }
    }),

    eventoFailure: () => ({
        type: Types.FAILURE
    }),

    eventoUserRequest: (token, evento) => ({
        type: Types.USER_EVENT_REQUEST,
        payload: { token, evento }
    }),

    eventoUserSuccess: ( evento_usuarios) => ({
        type: Types.USER_EVENT_SUCCESS,
        payload: { evento_usuarios }
    }),

    eventoNotHaveUserRequest: (token, evento) => ({
        type: Types.USER_NOT_EVENT_REQUEST,
        payload: { token, evento }
    }),

    eventoSaveUser: (token, evento, usuario_id) => ({
        type: Types.SAVE_USER_EVENT,
        payload: { token, evento, usuario_id }
    }),

    eventoAdd: (token, dados, user) => ({
        type: Types.ADD_EVENT_REQUEST,
        payload: { token, dados, user }
    })
}
