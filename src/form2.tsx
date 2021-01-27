import "./App.css";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FormState, RootState } from "./reducers/rootReducer";
import { submitUser } from "./submitUser";
import { Form2Data } from "./types";
import { UPDATE_FIELDS } from "./actionTypes";

function Form2() {
  const [submitted, setSubmitted] = useState(false);
  const formData: FormState = useSelector((state: RootState) => state.formData);
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: formData,
  });
  const dispatch = useDispatch();

  const onSubmit = (data: Form2Data) => {
    console.log(data);
    if (formData.name && formData.lastName && data.address) {
      dispatch({
        type: UPDATE_FIELDS,
        payload: data,
      });
      submitUser(formData.name, formData.lastName).then((res) => {
        setSubmitted(true);
      });
    }
  };

  useEffect(() => {
    if (submitted) {
      reset(formData);
    }
  }, [submitted, formData, reset]);

  return (
    <div className="container mt-4">
      <div className="card w-50 mx-auto">
        <div className="card-body">
          <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                placeholder="Address"
                className="form-control mb-3"
                name="address"
                ref={register}
                title="address"
              />
              <Button
                data-testid="submit-btn"
                disabled={Object.keys(formState.dirtyFields).length === 0}
                className="btn btn-primary btn-block mb-3"
                type="submit"
                title="submitButton"
              >
                Submit
              </Button>
              {submitted && (
                <small className="text-success" title="submittedConfirmation">
                  Submitted
                </small>
              )}
            </div>
            {submitted && (
              <div>
                <div>
                  Name:
                  <span data-testid="submitted-name">{formData.name}</span>
                </div>
                <div>
                  Last Name:
                  <span data-testid="submitted-last-name">
                    {formData.lastName}
                  </span>
                </div>
                <div>
                  Address:
                  <span data-testid="submitted-name">{formData.address}</span>
                </div>
                {formData.category && (
                  <div>
                    Category:
                    <span data-testid="submitted-name">
                      {formData.category}
                    </span>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form2;
