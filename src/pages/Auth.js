import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';

import Input from '../UI/Input';
import { checkValidity } from '../shared/utility';

import { useFirebase } from 'react-redux-firebase';

import useErrorMessage from '../shared/useErrorMessage';

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonText,
  IonButton,
  IonLoading,
  IonToast,
  useIonViewDidLeave,
  IonAlert,
  useIonViewDidEnter
} from '@ionic/react';

import styled from 'styled-components';

import { StyledIonList } from '../styles';

import classes from '../shared/styles.module.css';

const StyledCenterItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const StyledSubmitBtn = styled(IonButton)``;

const StyledForm = styled.form`
  margin-bottom: 24px;
`;

const StyledIonLoading = styled(IonLoading)`
  --spinner-color: var(--ion-color-secondary);
`;

const Auth = ({ onSignUp, signUpLoading, loginError, signUpError }) => {
  const [isValid, setIsValid] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPassResetForm, setShowPassResetForm] = useState(false);

  const {
    isError,
    errorMessage,
    fbMessage,
    setErrorMessage,
    handleClearError
  } = useErrorMessage();

  const firebase = useFirebase();

  useIonViewDidEnter(() => {
    setLoginLoading(false);
  });

  useEffect(() => {
    if (loginError) {
      setErrorMessage(loginError);
      if (isError && errorMessage) {
        setLoginLoading(false);
      } else if (isError && fbMessage) {
        setLoginLoading(false);
      }
    } else if (signUpError) {
      setErrorMessage(signUpError);
    }
  }, [
    loginError,
    signUpError,
    errorMessage,
    fbMessage,
    handleClearError,
    isError,
    setErrorMessage
  ]);

  useIonViewDidLeave(() => {
    setLoginLoading(false);
  });

  const [signUpForm, setSignUpForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text'
      },
      label: 'Jméno',
      value: '',
      validation: {
        required: true
      }
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email'
      },
      label: 'E-mail',
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password'
      },
      label: 'Heslo',
      value: '',
      validation: {
        required: true,
        minLength: 6,
        isPassEqual: true
      },
      valid: false,
      touched: false
    },
    passwordAgain: {
      elementType: 'input',
      elementConfig: {
        type: 'password'
      },
      label: 'Heslo znovu',
      value: '',
      validation: {
        required: true,
        minLength: 6,
        isPassAgainEqual: true
      },
      valid: false,
      touched: false
    }
  });
  const [loginForm, setLoginForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email'
      },
      label: 'E-mail',
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password'
      },
      label: 'Heslo',
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });

  const checkMatch = (value1, value2) => {
    if (value1 === value2) return true;
    else return false;
  };

  const inputChangedHandler = (event, controlName, state, setState) => {
    const updatedControls = {
      ...state,
      [controlName]: {
        ...state[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, state[controlName].validation),
        touched: true
      }
    };
    let formIsValid = true;
    if (updatedControls.passwordAgain) {
      for (let inputId in updatedControls) {
        formIsValid =
          updatedControls[inputId].valid &&
          formIsValid &&
          checkMatch(
            updatedControls.password.value,
            updatedControls.passwordAgain.value
          );
      }
    } else {
      for (let inputId in updatedControls) {
        formIsValid = updatedControls[inputId].valid && formIsValid;
      }
    }
    setIsValid(formIsValid);
    setState(updatedControls);
  };

  const submitSignUp = e => {
    e.preventDefault();
    onSignUp({
      email: signUpForm.email.value,
      password: signUpForm.password.value,
      name: signUpForm.name.value
    });
  };

  const submitLogin = e => {
    e.preventDefault();
    handleClearError();
    setLoginLoading(true);
    firebase.login({
      email: loginForm.email.value,
      password: loginForm.password.value
    });
  };

  const switchForm = () => {
    setIsSignUp(prevState => !prevState);
  };

  const handlePassReset = data => {
    const validityRequirements = { required: true, isEmail: true };
    const isValid = checkValidity(data.email, validityRequirements);
    if (isValid) {
      firebase
        .auth()
        .sendPasswordResetEmail(data.email)
        .then(() => {
          console.log('password changed');
        })
        .catch(error => {
          setErrorMessage(error);
          console.log(error);
          return false;
        });
    } else {
      setErrorMessage({
        code: 'invalid-email-input',
        message: 'Nejedná se o firebase akci. Message generována vývojářem'
      });
      return false;
    }
  };

  const sortInputs = (a, b) => {
    const keyA = a.id;
    const keyB = b.id;
    let comparison = 0;
    if (keyA > keyB) {
      comparison = 1;
    } else if (keyA < keyB) {
      comparison = -1;
    }
    return comparison;
  };

  let form = null;

  if (isSignUp) {
    const formElementsArray = [];
    for (let key in signUpForm) {
      formElementsArray.push({
        id: key,
        config: signUpForm[key]
      });
    }

    formElementsArray.sort(sortInputs);

    form = (
      <StyledForm onSubmit={submitSignUp}>
        <StyledIonList lines="full">
          {formElementsArray.map(formElement => (
            <IonItem key={formElement.id}>
              <IonLabel position="floating">
                <IonText color="dark">{formElement.config.label}</IonText>
                <IonText color="danger">
                  {formElement.id === 'password'
                    ? ' *(Minimálně 6 znaků)'
                    : ' *'}
                </IonText>
              </IonLabel>
              <Input
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={event =>
                  inputChangedHandler(
                    event,
                    formElement.id,
                    signUpForm,
                    setSignUpForm
                  )
                }
              />
            </IonItem>
          ))}
        </StyledIonList>
        <StyledCenterItems>
          <StyledSubmitBtn
            color="success"
            fill="outline"
            shape="round"
            type="submit"
            disabled={!isValid}
          >
            Registrovat
          </StyledSubmitBtn>
        </StyledCenterItems>
      </StyledForm>
    );
  } else {
    const formElementsArray = [];
    for (let key in loginForm) {
      formElementsArray.push({
        id: key,
        config: loginForm[key]
      });
    }
    formElementsArray.sort(sortInputs);

    form = (
      <StyledForm onSubmit={submitLogin}>
        <StyledIonList lines="full">
          {formElementsArray.map(formElement => (
            <IonItem key={formElement.id}>
              <IonLabel position="floating">
                <IonText color="dark">{formElement.config.label}</IonText>
                <IonText color="danger">*</IonText>
              </IonLabel>
              <Input
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={event =>
                  inputChangedHandler(
                    event,
                    formElement.id,
                    loginForm,
                    setLoginForm
                  )
                }
              />
            </IonItem>
          ))}
        </StyledIonList>
        <StyledCenterItems>
          <StyledSubmitBtn
            color="success"
            fill="outline"
            shape="round"
            type="submit"
            disabled={!isValid}
          >
            Přihlásit se
          </StyledSubmitBtn>
        </StyledCenterItems>
      </StyledForm>
    );
  }

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar color="primary">
          <IonTitle>{isSignUp ? ' Registrace' : 'Přihlášení'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="primary">
        {form}
        <StyledIonLoading
          isOpen={signUpLoading}
          message="Načítnání"
          backdropDismiss={true}
        />
        <IonLoading
          isOpen={loginLoading}
          message="Načítnání"
          backdropDismiss={true}
        />
        {isError && (
          <IonToast
            isOpen={true}
            message={errorMessage}
            position="top"
            duration={2000}
          />
        )}
        <StyledCenterItems>
          <IonButton color="secondary" fill="clear" onClick={switchForm}>
            Přepnout na
            {isSignUp ? ' přihlášení' : ' registraci'}
          </IonButton>
        </StyledCenterItems>
        {!isSignUp && (
          <StyledCenterItems>
            <IonButton
              fill="clear"
              shape="round"
              type="button"
              onClick={() => setShowPassResetForm(true)}
              color="dark"
            >
              Zapomenuté heslo
            </IonButton>
          </StyledCenterItems>
        )}
        {showPassResetForm && (
          <IonAlert
            isOpen={true}
            onDidDismiss={() => setShowPassResetForm(false)}
            header="Zapomenuté heslo"
            inputs={[
              {
                name: 'email',
                type: 'email',
                placeholder: 'Zadejte váš email',
                required: true
              }
            ]}
            buttons={[
              {
                text: 'Zrušit',
                role: 'cancel',
                cssClass: classes.alertButtonDanger,
                handler: () => {
                  setShowPassResetForm(false);
                }
              },
              {
                text: 'Potvrdit',
                cssClass: classes.alertButton,
                handler: data => {
                  if (handlePassReset(data)) {
                    return true;
                  } else {
                    return false;
                  }
                }
              }
            ]}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = state => {
  return {
    loginError: state.firebase.authError,
    signUpError: state.auth.error,
    signUpLoading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: newUser => dispatch(actionCreators.signUp(newUser))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
