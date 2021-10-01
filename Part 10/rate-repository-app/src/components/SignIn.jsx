import { Formik } from 'formik';
import React from 'react';
import TextInputForm from './TextInputForm'
import * as yup from 'yup'

const SignIn = () => {

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3)
      .required('username is required'),
    password: yup
      .string()
      .min(3)
      .required('password is required'),
  });

    const onSubmit = (values) => {
        console.log(values);
    };

    const initialValues = {
        username: '',
        password: '',
    };


  return (
    <Formik
     initialValues={initialValues}
     onSubmit={values => console.log(values)}
     validationSchema={validationSchema}
   >
     {(props) => (
       <TextInputForm handleSubmit={props.handleSubmit} />
     )}
   </Formik>
  
  )
};

export default SignIn;