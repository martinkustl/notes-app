import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    /* case actionTypes.AUTH_CHECK:
      return { ...state, userId: action.userId };
    case actionTypes.AUTH_REQUEST:
      return { ...state, loading: true };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        userId: action.userId
      };
    case actionTypes.AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true
      }; */
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        ...initialState
      };
    case actionTypes.LOGOUT_ERROR:
      return {
        ...state,
        error: action.error
      };
    case actionTypes.LOGIN_SUCCESS:
      console.log('login success');
      return { ...state, error: null };
    case actionTypes.LOGIN_ERROR:
      console.log('login error');
      return { ...state, error: action.error };
    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return { ...state, error: null };
    case actionTypes.SIGNUP_SUCCESS:
      console.log('signup success');
      return {
        ...state,
        error: null
      };
    case actionTypes.SIGNUP_ERROR:
      console.log('signup error');
      return {
        ...state,
        error: action.error.message
      };
    default:
      return state;
  }
};

export default reducer;
