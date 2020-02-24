import { useReducer, useCallback } from 'react';

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
    case 'auth/user-not-found':
      return {
        ...state,
        error: true,
        message: 'Chybné údaje'
      };
    case 'auth/wrong-password':
      return {
        ...state,
        error: true,
        message: 'Chybné údaje'
      };
    case 'auth/network-request-failed':
      return {
        ...state,
        error: true,
        message: 'Nemáte připojení k internetu'
      };
    case 'auth/email-already-in-use':
      return {
        ...state,
        error: true,
        message: 'Email je již využíván jiným účtem'
      };
    case 'invalid-email-input':
      return {
        ...state,
        error: true,
        message: 'Nezadali jste validní emailovou adresu'
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

  const setErrorMessage = useCallback(error => {
    dispatchError({ type: error.code, fbMessage: error.message });
  }, []);

  const handleClearError = useCallback(() => {
    dispatchError({ type: 'CLEAR' });
  }, []);

  return {
    errorMessage: errorState.message,
    isError: errorState.error,
    fbMessage: errorState.fbMessage,
    setErrorMessage: setErrorMessage,
    handleClearError: handleClearError
  };
};

export default useErrorMessage;
