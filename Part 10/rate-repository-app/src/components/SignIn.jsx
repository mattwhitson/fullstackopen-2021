import { Formik } from 'formik';
import React, {useState} from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import TextInputForm from './TextInputForm'


const SignIn = () => {
  const [input, setInput] = useState('')

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
   >
     {(props) => (
       <TextInputForm handleSubmit={props.handleSubmit} />
     )}
   </Formik>
  
  )
};

export default SignIn;