import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_NOTE_REQUEST:
      return { ...state, loading: true };
    case actionTypes.CREATE_NOTE_SUCCESS:
      return { ...state, loading: false, error: null };
    case actionTypes.CREATE_NOTE_ERROR:
      return { ...state, loading: false, error: action.error };
    case actionTypes.UPDATE_NOTE_REQUEST:
      return { ...state, loading: true };
    case actionTypes.UPDATE_NOTE_SUCCESS:
      return { ...state, loading: false, error: null };
    case actionTypes.UPDATE_NOTE_ERROR:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default reducer;
