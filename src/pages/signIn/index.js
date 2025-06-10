import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import {} from '@react-navigation/native'

import * as Animatable from 'react-native-animatable'

import { useNavigation } from '@react-navigation/native'

import { auth } from '../../../firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignIn(){

    const [userMail, setUserMail] = useState('');
    const [userPass, setUserPass] = useState('');

    function userLogin(){
        signInWithEmailAndPassword(auth, userMail, userPass).then((userCrential) => {
            const user = userCrential.user;

            alert('Login Efetuado...');
            navigation.navigate('MainPage')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        })
    }

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Bem-vindo(a)</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" delay={650} style={styles.containerForm}>
                <Text style={styles.title}>Email</Text>
                <TextInput 
                    placeholder="Digite um Email..."
                    value={userMail}
                    onChangeText={setUserMail}
                    style={styles.input}

                />

                <Text style={styles.title}>Senha</Text>
                <TextInput 
                    secureTextEntry={true}
                    placeholder="Sua senha"
                    value={userPass}
                    onChangeText={setUserPass}
                    style={styles.input}
                />

                <TouchableOpacity onPress={userLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ () => navigation.navigate('Register')}  style={styles.buttonRegister}>
                    <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
                </TouchableOpacity>
            </Animatable.View>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#04bc64',
    },
    containerHeader:{
        marginTop: '14%',
        marginStart: '8%',
    },
    message:{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: '10%'
    },
    containerForm: {
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: '5%',
        paddingEnd: '5%',
        marginTop: '20%'
    },
    title:{
        fontSize: 20,
        marginTop: 28,
    },
    input:{
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16
    },
    button:{
        backgroundColor: '#04bc64',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold'
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center',
    },
    registerText:{
        color: '#a1a1a1'
    }
    
})