import React, {useState} from "react";
import {View, TextInput, Text, StyleSheet, Button, Alert} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {authorize} from "../../services/api";
import {saveDataInStorage} from "../../services/storage";

const showAlertError = () => Alert.alert('Произошла ошибка', 'Проверьте правильность введённых данных')

export function LoginScreen({navigation}) {
    const [login, setLogin] = useState(null);
    const [password, setPassword] = useState(null);

    console.log(login, password)

    const handleSubmit = () => {
        if (login && password) {
            authorize(login, password)
                .then(({data}) => {
                    console.log(data)
                    saveDataInStorage('access_token', data.access_token)
                    saveDataInStorage('refresh_token', data.refresh_token)
                    navigation.navigate('HomeScreen')
                })
                .catch((err) => {
                    console.warn(err)
                    showAlertError()
                })
        } else {
            showAlertError()
        }
    }

    return (
        <SafeAreaView style={styles.loginView}>
            <Text style={styles.loginTitle}>Авторизация</Text>
            <TextInput style={styles.loginInput} placeholder="Логин" value={login} onChangeText={setLogin} />
            <TextInput style={styles.loginInput} placeholder="Пароль" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Войти" onPress={handleSubmit} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    loginTitle: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 15
    },
    loginView: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    loginInput: {
        minHeight: 40,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 15
    }
})