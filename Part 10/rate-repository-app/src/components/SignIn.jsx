import { Formik } from 'formik';
import React from 'react';
import TextInputForm from './TextInputForm'
import * as yup from 'yup'
import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/queries";

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

  const onSubmit = async (values) => {
    const [mutate, result] = useMutation(SIGN_IN);
    
    
    try {
      await mutate({variables: {values}});
      console.log(result)
    } catch (e) {
      console.log(e);
    }
  };

    const initialValues = {
        username: '',
        password: '',
    };


  return (
    <Formik
     initialValues={initialValues}
     onSubmit={onSubmit}
     validationSchema={validationSchema}
   >
     {(props) => (
       <TextInputForm handleSubmit={props.handleSubmit} />
     )}
   </Formik>
  
  )
};

export default SignIn;