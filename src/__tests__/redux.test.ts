import rootReducer from "../reducers/rootReducer";
import * as types from "../actionTypes";

describe("todos reducer", () => {
  it("should return the initial state", () => {
    expect(rootReducer(undefined, {})).toEqual({ formData: {} });
  });

  it("should handle UPDATE_FIELD", () => {
    expect(
      rootReducer(
        {},
        {
          type: types.UPDATE_FIELD,
          payload: {
            field: "fieldName",
            value: "fieldValue",
          },
        }
      )
    ).toEqual({
      formData: {
        fieldName: "fieldValue",
      },
    });

    expect(
      rootReducer(
        {
          formData: {
            fieldName: "fieldValue",
          },
        },
        {
          type: types.UPDATE_FIELD,
          payload: {
            field: "fieldName",
            value: "fieldValue2",
          },
        }
      )
    ).toEqual({
      formData: {
        fieldName: "fieldValue2",
      },
    });

    expect(
      rootReducer(
        {
          formData: {
            fieldName: "fieldValue",
          },
        },
        {
          type: types.UPDATE_FIELD,
          payload: {
            field: "fieldName2",
            value: "fieldValue2",
          },
        }
      )
    ).toEqual({
      formData: {
        fieldName: "fieldValue",
        fieldName2: "fieldValue2",
      },
    });
  });

  it("should handle UPDATE_FIELDS", () => {
    expect(
      rootReducer(
        {},
        {
          type: types.UPDATE_FIELDS,
          payload: {
            fieldName: "fieldValue",
            fieldName2: "fieldName2",
            fieldName3: "fieldName3",
          },
        }
      )
    ).toEqual({
      formData: {
        fieldName: "fieldValue",
        fieldName2: "fieldName2",
        fieldName3: "fieldName3",
      },
    });

    expect(
      rootReducer(
        {
          formData: {
            fieldName: "fieldValue",
            fieldName2: "fieldName2",
            fieldName3: "fieldName3",
          },
        },
        {
          type: types.UPDATE_FIELDS,
          payload: {
            fieldName: "fieldValueChanged",
          },
        }
      )
    ).toEqual({
      formData: {
        fieldName: "fieldValueChanged",
        fieldName2: "fieldName2",
        fieldName3: "fieldName3",
      },
    });

    expect(
      rootReducer(
        {
          formData: {
            fieldName: "fieldValue",
            fieldName2: "fieldName2",
            fieldName3: "fieldName3",
          },
        },
        {
          type: types.UPDATE_FIELDS,
          payload: {
            fieldName4: "fieldName4",
          },
        }
      )
    ).toEqual({
      formData: {
        fieldName: "fieldValue",
        fieldName2: "fieldName2",
        fieldName3: "fieldName3",
        fieldName4: "fieldName4",
      },
    });
  });

  it("should handle RESET", () => {
    expect(
      rootReducer(
        {},
        {
          type: types.RESET,
        }
      )
    ).toEqual({
      formData: {},
    });

    expect(
      rootReducer(
        {
          formData: {
            fieldName: "fieldValue",
            fieldName2: "fieldName2",
            fieldName3: "fieldName3",
          },
        },
        {
          type: types.RESET,
        }
      )
    ).toEqual({
      formData: {},
    });
  });
});
