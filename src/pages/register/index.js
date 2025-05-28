import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'

import * as Animatable from 'react-native-animatable'

import { useNavigation } from '@react-navigation/native'

export default function Register(){

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Faça seu cadastro</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" delay={650} style={styles.containerForm}>
                <Text style={styles.title}>Nome</Text>
                    <TextInput 
                        placeholder="Digite seu nome..."
                        style={styles.input}
                    />

                <Text style={styles.title}>Email</Text>
                    <TextInput 
                        placeholder="Digite seu email..."
                        style={styles.input}
                    />

                <Text style={styles.title}>Senha</Text>
                    <TextInput
                        secureTextEntry={true}
                        placeholder='Sua senha'
                        style={styles.input}
                    />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity  onPress={ () => navigation.navigate('SignIn')} style={styles.buttonRegister}>
                    <Text style={styles.registerText}>Voltar para página de login</Text>
                </TouchableOpacity>
            </Animatable.View>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#38a69d',
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
        backgroundColor: '#38a69d',
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