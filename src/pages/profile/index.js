import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function UserDataScreen() {
    const navigation = useNavigation();

  // Dados simulados
    const userData = {
        nome: 'João da Silva',
        email: 'joao@email.com',
        senha: '••••••••',
    };

    const handleLogout = () => {
        Alert.alert("Logout", "Sua conta foi deslogada com sucesso.");
        navigation.navigate('SignIn');
};

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Seus dados cadastrados</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" delay={650} style={styles.containerForm}>
                <Text style={styles.label}>Nome:</Text>
                <Text style={styles.info}>{userData.nome}</Text>

                <Text style={styles.label}>Email:</Text>
                <Text style={styles.info}>{userData.email}</Text>

                <Text style={styles.label}>Senha:</Text>
                <Text style={styles.info}>{userData.senha}</Text>

                <TouchableOpacity onPress={handleLogout} style={styles.button}>
                    <Text style={styles.buttonText}>Sair</Text>
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
    marginTop: '10%',
},
    containerForm: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: '5%',
    marginTop: '20%',
},
    label: {
    fontSize: 18,
    marginTop: 24,
    color: '#333',
    fontWeight: 'bold',
},
    info: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
},
    button: {
    backgroundColor: '#38a69d',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 10,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
},
    buttonText:{
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
    }

}

);
