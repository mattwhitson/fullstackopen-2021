import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { Formik, useField } from 'formik';

const TextInputForm = ({handleSubmit}) => {
    const [userField, userMeta, userHelpers] = useField('username');
    const [passwordField, passwordMeta, passwordHelpers] = useField('password')


    return(
        <View>
            <TextInput
            placeholder={'username'}
            value={userField.value}
            onChangeText={(text) => userHelpers.setValue(text)}
            />
            <TextInput 
            placeholder={'password'}
            value={passwordField.value}
            onChangeText={(text) => passwordHelpers.setValue(text)}
            secureTextEntry={true}
            />
            <Button onPress={handleSubmit} title="Submit" />
        </View>
    )
}

export default TextInputForm