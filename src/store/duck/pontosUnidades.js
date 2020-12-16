/**
 * Actions Types
 */
export const Types = {
    REQUEST: 'PONTOS_UNIDADE_REQUEST',
    SUCCESS: 'PONTOS_UNIDADE_SUCCESS',
    FAILURE: 'PONTOS_UNIDADE_FAILURE'
}

/**
 * Reducers
 */
const INITIAL_STATE = {
    pontos_unidade: null,
    loading: false,
    error: false
}

export default function pontosUnidades(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.REQUEST:
            return { ...state, loading: true }
        case Types.SUCCESS:
            return {
                ...state,
                pontos_unidade: action.payload.pontos_unidade,
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
    userUnityPointRequest: (token, user) => ({
        type: Types.REQUEST,
        payload: { token, user }
    }),

    userUnityPointSuccess: (pontos_unidade) => ({
        type: Types.SUCCESS,
        payload: { pontos_unidade }
    }),

    userUnityPOintFailure: () => ({
        type: Types.FAILURE
    })
}