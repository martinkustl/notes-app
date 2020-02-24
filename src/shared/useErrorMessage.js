import { useReducer } from 'react';

const initialState = {
  error: false,
  message: null,
  fbMessage: null
};

const errorMessageReducer = (state, action) => {
  switch (action.type) {
    case 'auth/requires-recent-login':
      return {
        ...state,
        error: true,
        message:
          'Pro změnu emailu je nutné nedávné přihlášení. Před dalším pokusem o změnu se odhlašte a znovu přihlašte.'
      };
    case 'CLEAR':
      return initialState;
    default:
      return {
        ...state,
        error: true,
        message: 'Neznámá chyba',
        fbMessage: action.fbMessage
      };
  }
};

const useErrorMessage = () => {
  const [errorState, dispatchError] = useReducer(errorMessageReducer, {
    error: false,
    message: null,
    fbMessage: null
  });

  const setErrorMessage = error => {
    dispatchError({ type: error.code, fbMessage: error.message });
  };

  const handleClearError = () => {
    dispatchError({ type: 'CLEAR' });
  };

  return {
    errorMessage: errorState.message,
    isError: errorState.error,
    fbMessage: errorState.fbMessage,
    setErrorMessage: setErrorMessage,
    handleClearError: handleClearError
  };
};

export default useErrorMessage;
