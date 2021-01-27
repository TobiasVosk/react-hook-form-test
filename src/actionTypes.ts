import { FormState } from "./reducers/rootReducer";

export const UPDATE_FIELD = "UPDATE_FIELD";
export const UPDATE_FIELDS = "UPDATE_FIELDS";
export const RESET = "RESET";

interface UpdateFieldData {
    field: string;
    value: string;
}

interface UpdateFieldAction {
  type: typeof UPDATE_FIELD;
  payload: UpdateFieldData;
}

interface UpdateFieldsAction {
  type: typeof UPDATE_FIELDS;
  payload: FormState;
}

interface ResetFieldsAction {
  type: typeof RESET;
}

export type FormActionType = UpdateFieldAction | UpdateFieldsAction | ResetFieldsAction;