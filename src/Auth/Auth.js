import React, { useState } from 'react';

import * as firebase from 'firebase';

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

const Auth = () => {
  const [authForm, setAuthForm] = useState({
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
      isValid = value === authForm.password.value;
    }

    return isValid;
  };

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...authForm,
      [controlName]: {
        ...authForm[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForm[controlName].validation
        ),
        touched: true
      }
    };
    setAuthForm(updatedControls);
  };

  const formElementsArray = [];
  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key]
    });
  }

  let form = formElementsArray.map(formElement => (
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
        changed={event => inputChangedHandler(event, formElement.id)}
      />
    </IonItem>
  ));

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar color="primary">
          <IonTitle>Registrace</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="primary">
        <form>
          <StyledIonList lines="full">
            {form}
            {/* <IonItem>
              <IonLabel position="floating">
                <IonText color="dark">E-mail</IonText>
                <IonText color="danger">*</IonText>
              </IonLabel>
              <IonInput required type="text" color="dark"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">
                <IonText color="dark">Jméno</IonText>
                <IonText color="danger">*</IonText>
              </IonLabel>
              <IonInput required type="text"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">
                <IonText color="dark">Heslo</IonText>
                <IonText color="danger">*</IonText>
              </IonLabel>
              <IonInput required type="password"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">
                <IonText color="dark">Heslo znovu</IonText>
                <IonText color="danger">*</IonText>
              </IonLabel>
              <IonInput required type="password"></IonInput>
            </IonItem> */}
          </StyledIonList>
        </form>
        <StyledCenterItems>
          <IonButton color="secondary" fill="outline" shape="round">
            Registrovat
          </IonButton>
        </StyledCenterItems>
      </IonContent>
    </IonPage>
  );
};

export default Auth;
