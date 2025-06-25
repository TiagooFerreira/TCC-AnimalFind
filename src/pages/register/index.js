import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase.config';
import { getDatabase, ref, set } from 'firebase/database';

export default function Register() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  function showModal(message) {
    setModalMessage(message);
    setModalVisible(true);
  }

  function registerUser() {
    if (!email || !senha || !nome || !cpf || !telefone) {
      showModal('Um ou mais campos sem informação.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        const dbRealtime = getDatabase();

        return set(ref(dbRealtime, 'users/' + userId), {
          nome: nome,
          cpf: cpf,
          telefone: telefone,
          email: email,
          createdAt: new Date().toISOString()
        });
      })
      .then(() => {
        showModal('Usuário cadastrado com sucesso!');
      })
      .catch((error) => {
        console.log(error);
        showModal('Erro ao cadastrar: ' + error.message);
      });
  }

  return (
    <ScrollView style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Faça seu cadastro</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={650} style={styles.containerForm}>
        <Text style={styles.title}>Nome</Text>
        <TextInput
          placeholder="Digite seu nome..."
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.title}>Email</Text>
        <TextInput
          placeholder="Digite seu email..."
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.title}>Telefone</Text>
        <TextInputMask
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) '
          }}
          placeholder="Digite seu número de telefone..."
          style={styles.input}
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />

        <Text style={styles.title}>CPF</Text>
        <TextInputMask
          type={'cpf'}
          placeholder="Digite seu CPF..."
          style={styles.input}
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          secureTextEntry={true}
          placeholder="Sua senha..."
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button} onPress={registerUser}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.buttonRegister}>
          <Text style={styles.registerText}>Voltar para página de login</Text>
        </TouchableOpacity>
      </Animatable.View>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                if (modalMessage.includes('sucesso')) {
                  navigation.navigate('SignIn');
                }
              }}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04bc64',
  },
  containerHeader: {
    marginTop: '8%',
    marginStart: '8%',
  },
  message: {
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
    marginTop: '20%',
  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#04bc64',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: 'center',
  },
  registerText: {
    color: '#a1a1a1',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#04bc64',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
