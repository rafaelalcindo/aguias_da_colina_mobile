/**
 * Action Types
 */
export const Types = {
    REQUEST: 'PONTOS_REQUEST',
    SUCCESS: 'PONTOS_SUCCESS',
    FAILURE: 'PONTOS_FAILURE'
}

/**
 * Reducers
 */
const INITIAL_STATE = {
    pontos: null,
    loading: false,
    error: false
}

export default function pontosIndividuais(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.REQUEST:
            return { ...state, loading: true }
        case Types.SUCCESS:
            return {
                ...state,
                pontos: action.payload.pontos,
                error: false,
                loading: false
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
    userPointRequest: (token, user) => ({
        type: Types.REQUEST,
        payload: { token, user }
    }),

    userPointSuccess: (pontos) => ({
        type: Types.SUCCESS,
        payload: { pontos }
    }),

    userPointFailure: () => ({
        type: Types.FAILURE
    })
 }