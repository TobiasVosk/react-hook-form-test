import { combineReducers } from "redux";
import { FormActionType, UPDATE_FIELD, UPDATE_FIELDS } from "../actionTypes";

export interface FormState {
  name?: string;
  lastName?: string;
  category?: string;
  address?: string;
}

const initialState: FormState = {};
const formDataReducer = (
  state = initialState,
  action: FormActionType
): FormState => {
  switch (action.type) {
    case UPDATE_FIELD:
      return { ...state, [action.payload.field]: action.payload.value };
    case UPDATE_FIELDS:
      return { ...state, ...action.payload};
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  formData: formDataReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
