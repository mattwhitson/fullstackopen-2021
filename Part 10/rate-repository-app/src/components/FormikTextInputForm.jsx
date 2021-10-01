import React from 'react'
import { useField } from "formik"
import { StyleSheet, TextInput, View } from "react-native"
import Text from '../utils/Text'



const FormikTextInputForm = ({name, ...props}) => {
    const [field, meta, helpers] = useField(name)
    const showError = meta.touched && meta.error

    const styles = StyleSheet.create({
        errorText: {
            marginTop: 5,
            marginRight: '65%',
            borderStyle: 'solid',
            borderColor: 'red',
            borderWidth: 1,
            borderRadius: 3,
        },
        textColor: {
            color: 'red',
            textAlign: 'center'
        }
    })

    return(
        <>
        <TextInput
        placeholder={props.placeholder}
        value={field.value}
        onChangeText={(text) => helpers.setValue(text)}
        secureTextEntry={props.secureTextEntry}
        />
        {showError && <View style={styles.errorText}><Text style={styles.textColor}>{meta.error}</Text></View>}
        </>
    )
}

export default FormikTextInputForm