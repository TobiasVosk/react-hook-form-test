import './App.css';
import { useForm } from 'react-hook-form';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const { register, handleSubmit, watch, errors } = useForm();
  const [ submitted, setSubmitted ] = React.useState(false);
  const onSubmit = data => {
      setSubmitted(true)
      console.log(data);
  };

  return (
    <div className="container mt-4">
      <div className="card w-50 mx-auto">
        <div className="card-body">
          <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input placeholder="Name" className="form-control mb-3" name="name" defaultValue="test" ref={register} title="name"/>

              <div className="mb-3">
                <input placeholder="Last Name" className={`form-control ${errors.lastName ? "invalid" : ""}`} name="lastName" title="lastName"
                  ref={register({
                    required: {value: true, message: "Last name is required"}, 
                    pattern: {value: /^[a-zA-Z ]+$/i, message: "Name is invalid. Only letters and spaces are accepted"}
                  })} />
                {errors.lastName && <small className="text-danger" title="lastNameValidation">{errors.lastName.message}</small>}
              </div>
              <Button className="btn btn-primary btn-block mb-3" type="submit" title="submitButton">Submit</Button>

              {submitted && <small className="text-success" title="submittedConfirmation">Submitted</small>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
