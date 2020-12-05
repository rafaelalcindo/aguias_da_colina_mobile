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
                error: false,
                loading: false
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
      loginRequest: username => ({
          type: Types.REQUEST,
          payload: {username}
      }),

      loginSuccess: (username, password) => ({
          type: Types.SUCCESS,
          payload: { username, password }
      }),

      loginFailure: () => ({
          type: Types.FAILURE
      })
  }