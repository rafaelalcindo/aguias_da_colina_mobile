/**
 * Actions Types
 */
export const Types = {
    REQUEST: 'EVENTOS_REQUEST',
    SUCCESS: 'EVENTOS_SUCCESS',
    FAILURE: 'EVENTOS_FAILURE'
}

/**
 * Reducers
 */
const INITIAL_STATE = {
    eventos: null,
    loading: false,
    error: false
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
    })
}
