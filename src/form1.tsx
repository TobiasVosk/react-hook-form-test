import './App.css';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { submitUser } from './submitUser';

var classNames = require('classnames');

function Form1() {
  const [latestSubmit, setLatestSubmit] = useState<{name: string, lastName: string}>();
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, errors, formState, reset } = useForm();

  const onSubmit = (data: {name: string, lastName: string}) => {
    setSubmitted(true);
    submitUser(data.name, data.lastName).then((res) => {
      setLatestSubmit(res);
    });
  };

  useEffect(() => {
    if (latestSubmit) {
      reset(latestSubmit);
    }
  }, [latestSubmit, reset])

  return (
    <div className="container mt-4">
      <div className="card w-50 mx-auto">
        <div className="card-body">
          <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input placeholder="Name" className="form-control mb-3" name="name" defaultValue="test" ref={register} title="name" />

              <div className="mb-3">
                <input placeholder="Last Name"
                  className={classNames('form-control', { 'invalid': errors.lastName })}
                  name="lastName" title="lastName"
                  ref={register({
                    required: { value: true, message: "Last name is required" },
                    pattern: { value: /^[a-zA-Z ]+$/i, message: "Last name is invalid. Only letters and spaces are accepted" }
                  })} />
                {errors.lastName && <small data-testid="last-name-validation-error" className="text-danger" title="lastNameValidation">{errors.lastName.message}</small>}
              </div>

              <select data-testid="select-category" className="form-control mb-3" name="category" ref={register}>
                <option value="">Select...</option>
                <option value="A">Category A</option>
                <option value="B">Category B</option>
              </select>
              <Button data-testid="submit-btn" disabled={Object.keys(formState.dirtyFields).length === 0} className="btn btn-primary btn-block mb-3" type="submit" title="submitButton">Submit</Button>
              {submitted && <small className="text-success" title="submittedConfirmation">Submitted</small>}
            </div>
          </form>
        </div>
      </div>
      {latestSubmit && <div>
        <div>Name: <span data-testid="submitted-name">{latestSubmit.name}</span></div>
        <div>Last Name: <span data-testid="submitted-last-name">{latestSubmit.lastName}</span></div>
      </div>}
    </div>
  );
}

export default Form1;
