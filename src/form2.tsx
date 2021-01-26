import './App.css';
import { useForm } from 'react-hook-form';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { StringMappingType } from 'typescript';


function Form2() {

  const { register, handleSubmit, errors, formState, reset } = useForm();

  const onSubmit = (data: {address: StringMappingType}) => {
    console.log(data)
  };

  return (
    <div className="container mt-4">
      <div className="card w-50 mx-auto">
        <div className="card-body">
          <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input placeholder="Address" className="form-control mb-3" name="address" ref={register} title="address" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form2;
