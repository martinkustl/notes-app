import React from 'react';

import { IonInput, IonTextarea } from '@ionic/react';

const Input = props => {
  let inputElement = null;

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <IonInput
          {...props.elementConfig}
          value={props.value}
          onIonChange={props.changed}
        />
      );
      break;
    case 'textArea':
      inputElement = <IonTextarea />;
      break;
    default:
      inputElement = (
        <IonInput
          {...props.elementConfig}
          value={props.value}
          onIonChange={props.changed}
        />
      );
  }

  return inputElement;
};

export default Input;
