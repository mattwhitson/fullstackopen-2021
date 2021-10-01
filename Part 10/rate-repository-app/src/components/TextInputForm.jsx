import React from 'react';
import { View, Button } from 'react-native';
import FormikTextInputForm from './FormikTextInputForm';

const TextInputForm = ({handleSubmit}) => {

    return(
        <View>
            <FormikTextInputForm name="username" placeholder="username" secureTextEntry={false}/>
            <FormikTextInputForm name="password" placeholder="password" secureTextEntry={true}/>
            <Button onPress={handleSubmit} title="Submit" />
        </View>
    )
}

export default TextInputForm