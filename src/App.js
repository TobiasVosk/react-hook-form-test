import './App.css';
import { useForm } from 'react-hook-form';
import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const { register, handleSubmit, watch, errors } = useForm();
  const validated = false;
  const onSubmit = data => console.log(data);

  return (
    <div className="container mt-4">
      <div className="card w-50 mx-auto">
        <div className="card-body">
          <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input placeholder="Name" className="form-control mb-3" name="name" defaultValue="test" ref={register} />

              <div className="mb-3">
                <input placeholder="Last Name" className={`form-control ${errors.lastName ? "invalid" : ""}`} name="lastName"
                  ref={register({
                    required: {
                      value: true,
                      message: "Name is required"
                    }, 
                    pattern: {
                      value: /^[a-zA-Z ]+$/i,
                      message: "Name is invalid. Only letters and spaces are accepted"
                    }
                  })} />
                {errors.lastName && <small className="text-danger">{errors.lastName.message}</small>}
              </div>

              <input className="btn btn-primary btn-block" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
