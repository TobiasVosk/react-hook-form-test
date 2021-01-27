import { FormState } from "./reducers/rootReducer";

export const UPDATE_FIELD = "UPDATE_FIELD";
export const UPDATE_FIELDS = "UPDATE_FIELDS";


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

export type FormActionType = UpdateFieldAction | UpdateFieldsAction;