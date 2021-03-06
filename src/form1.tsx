import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { UPDATE_FIELDS } from "./actionTypes";
import "./App.css";
import { FormState, RootState } from "./reducers/rootReducer";
import { Form1Data } from "./types";

var classNames = require("classnames");

function Form1() {
  const history = useHistory();
  const formData: FormState = useSelector((state: RootState) => state.formData);
  const dispatch = useDispatch();

  const { register, handleSubmit, errors, formState } = useForm({
    defaultValues: formData,
  });

  const onSubmit = (data: Form1Data) => {
    dispatch({
      type: UPDATE_FIELDS,
      payload: data,
    });
    history.push("/form2")
  };

  return (
    <div className="container mt-4">
      <div className="card w-50 mx-auto">
        <div className="card-body">
          <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                placeholder="Name"
                className="form-control mb-3"
                name="name"
                defaultValue="test"
                ref={register}
                title="name"
              />

              <div className="mb-3">
                <input
                  placeholder="Last Name"
                  className={classNames("form-control", {
                    invalid: errors.lastName,
                  })}
                  name="lastName"
                  title="lastName"
                  ref={register({
                    required: { value: true, message: "Last name is required" },
                    pattern: {
                      value: /^[a-zA-Z ]+$/i,
                      message:
                        "Last name is invalid. Only letters and spaces are accepted",
                    },
                  })}
                />
                {errors.lastName && (
                  <small
                    data-testid="last-name-validation-error"
                    className="text-danger"
                    title="lastNameValidation"
                  >
                    {errors.lastName.message}
                  </small>
                )}
              </div>

              <select
                data-testid="select-category"
                className="form-control mb-3"
                name="category"
                ref={register}
              >
                <option value="">Select...</option>
                <option value="A">Category A</option>
                <option value="B">Category B</option>
              </select>
              <Button
                data-testid="submit-btn"
                disabled={Object.keys(formState.dirtyFields).length === 0}
                className="btn btn-primary btn-block mb-3"
                type="submit"
                title="submitButton"
              >
                Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form1;
