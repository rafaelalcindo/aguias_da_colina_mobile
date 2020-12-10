/**
 * Action Types
 */
export const Types = {
    REQUEST: 'LOGIN_REQUEST',
    SUCCESS: 'LOGIN_SUCCESS',
    CHECK: 'LOGIN_CHECK',
    AUTH: 'LOGIN_AUTH',
    FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGIN_LOGOUT'
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
        case Types.CHECK:
            return { ...state, token: action.payload.token }
        case Types.AUTH:
            return { ...state, user: action.payload.user }
        case Types.LOGOUT: 
            return { 
                ...state,
                username: null,
                password: null,
                user: null,
                token: null,
                loading: false,
                error: false
            }
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
      }),

      loginCheckUser: (token) => ({
          type: Types.CHECK,
          payload: { token }
      }),

      loginAuthUser: (user) => ({
          type: Types.AUTH,
          payload: { user }
      }),

      loginLogout: () => ({
          type: Types.LOGOUT
      })
      
  }