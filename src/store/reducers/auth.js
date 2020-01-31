import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  authRedirectPath: '/'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_LOADING:
      return {
        ...state,
        error: null,
        loading: true
      };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        error: null
      };
    case actionTypes.SIGNUP_ERROR:
      return {
        ...state,
        error: { code: action.error.code, message: action.error.message },
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
