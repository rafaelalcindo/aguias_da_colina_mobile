/**
 * Actions Types
 */

export const Types = {
    REQUEST: 'ESPECIALIDADE_REQUEST',
    SUCCESS: 'ESPECIALIDADE_SUCCESS',
    FAILURE: 'ESPECIALIDADE_FAILURE'
}

/**
 * Reducers
 */
const INITIAL_STATE = {
    especialidades: null,
    loading: false,
    error: false
}

export default function especialidades(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.REQUEST:
            return { ...state, loading: true }
        case Types.SUCCESS:
            return {
                ...state,
                especialidades: action.payload.especialidades,
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
    especialidadeRequest: (token, user) => ({
        type: Types.REQUEST,
        payload: { token, user }
    }),

    especialidadeSuccess: (especialidades) => ({
        type: Types.SUCCESS,
        payload: { especialidades }
    }),

    especialidadeFailure: () => ({
        type: Types.FAILURE
    })
}
