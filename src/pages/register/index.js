import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase.config';

import { getFirestore, doc, setDoc } from 'firebase/firestore';

export default function Register(){

    const navigation = useNavigation();

    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputTel, setInputTel] = useState("");
    const [inputCPF, setInputCPF] = useState("");
    const [inputPass, setInputPass] = useState("");

    const db = getFirestore();

    function registerUser() {
    if (!inputEmail || !inputPass) {
      alert('Preencha email e senha');
      return;
    }

    createUserWithEmailAndPassword(auth, inputEmail, inputPass)
      .then(() => {
        alert('Usuário cadastrado com sucesso!');
        navigation.navigate('SignIn');
      })
      .catch(error => {
        alert(error.message);
      });
  }

    return (
        <ScrollView style={styles.container}>
            <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Faça seu cadastro</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" delay={650} style={styles.containerForm}>
                <Text style={styles.title}>Nome</Text>
                    <TextInput 
                        placeholder="Digite seu nome..."
                        style={styles.input}
                        value={inputName}
                        onChangeText={setInputName}
                    />

                <Text style={styles.title}>Email</Text>
                    <TextInput 
                        placeholder="Digite seu email..."
                        style={styles.input}
                        value={inputEmail}
                        onChangeText={setInputEmail}
                    />

                <Text style={styles.title}>Telefone</Text>
                    <TextInput 
                        placeholder="Digite seu telefone..."
                        style={styles.input}
                        keyboardType="phone-pad"
                        value={inputTel}
                        onChangeText={setInputTel}
                    />

                <Text style={styles.title}>CPF</Text>
                    <TextInput 
                        placeholder="Digite seu CPF..."
                        style={styles.input}
                        keyboardType="numeric"
                        value={inputCPF}
                        onChangeText={setInputCPF}
                    />

                <Text style={styles.title}>Senha</Text>
                    <TextInput
                        secureTextEntry={true}
                        placeholder='Sua senha'
                        style={styles.input}
                        value={inputPass}
                        onChangeText={setInputPass}
                    />

                <TouchableOpacity style={styles.button} onPress={registerUser}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity  onPress={ () => navigation.navigate('SignIn')} style={styles.buttonRegister}>
                    <Text style={styles.registerText}>Voltar para página de login</Text>
                </TouchableOpacity>
            </Animatable.View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#04bc64',
    },
    containerHeader:{
        marginTop: '8%',
        marginStart: '8%',
    },
    message:{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: '4%',
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
