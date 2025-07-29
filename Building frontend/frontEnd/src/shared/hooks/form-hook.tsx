import { useCallback, useReducer } from "react";

import type { FormState, FormAction, FormInputs } from "../../type";

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "INPUT_CHANGE": {
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            ...state.inputs[action.inputId],
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };
    }
    case "SET_DATA": {
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    }

    default:
      return state;
  }
};

export const useForm = (
  initialInputs: FormInputs,
  initialFormvalidity: boolean
) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormvalidity,
  });

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    []
  );

  const setFormData = useCallback((inputData, formIsValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formIsValidity,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
