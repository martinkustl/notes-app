import React, { useState } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';

import Input from '../UI/Input';

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonText,
  IonButton
} from '@ionic/react';

import styled from 'styled-components';

import { StyledIonList } from '../styles';

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

const Auth = ({ onLogin, onSignUp }) => {
  const [isValid, setIsValid] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
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
        minLength: 6
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
        minLength: 6
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

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isSame) {
      isValid = value === signUpForm.password.value;
    }

    return isValid;
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
    for (let inputId in updatedControls) {
      formIsValid = updatedControls[inputId].valid && formIsValid;
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
    onLogin({
      email: loginForm.email.value,
      password: loginForm.password.value
    });
  };

  const switchForm = () => {
    setIsSignUp(prevState => !prevState);
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

    form = (
      <StyledForm onSubmit={submitSignUp}>
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
          <IonTitle>Registrace</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="primary">
        {form}
        <StyledCenterItems>
          <IonButton color="secondary" fill="clear" onClick={switchForm}>
            Přepnout na
            {isSignUp ? ' přihlášení' : ' registraci'}
          </IonButton>
        </StyledCenterItems>
      </IonContent>
    </IonPage>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    /* onAuth: (email, password, isSignUp) =>
      dispatch(actionCreators.auth(email, password, isSignUp)), */
    onLogin: creds => dispatch(actionCreators.login(creds)),
    onSignUp: newUser => dispatch(actionCreators.signUp(newUser))
  };
};

export default connect(null, mapDispatchToProps)(Auth);
