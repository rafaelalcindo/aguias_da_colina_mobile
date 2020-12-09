/**
 * Action Types
 */
export const Types = {
    REQUEST: 'LOGIN_REQUEST',
    SUCCESS: 'LOGIN_SUCCESS',
    FAILURE: 'LOGIN_FAILURE'
}

/**
 * Reducers
 */
 const INITAL_STATE = {
     username: null,
     password: null,
     user: null,
     token: null,
     loading: false,
     error: false
 }

 export default function login(state = INITAL_STATE, action) {
     switch (action.type) {
         case Types.REQUEST:
            return { ...state, loading: true };
        case Types.SUCCESS:
            return { 
                ...state, 
                username: action.payload.username,
                password: action.payload.password,
                user: action.payload.user,
                token: action.payload.token,
                error: false,
                loading: true
            }
        case Types.FAILURE:
            return { ...state, error: true, loading: false };
        default:
            return state;
     }
 }

 /**
  * Actions Creators
  */
  export const Creators = {
      loginRequest: (username, password) => ({
          type: Types.REQUEST,
          payload: {username, password}
      }),

      loginSuccess: (username, password, user, token) => ({
          type: Types.SUCCESS,
          payload: { username, password, user, token }
      }),

      loginFailure: () => ({
          type: Types.FAILURE
      })
  }