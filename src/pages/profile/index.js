import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

export default function UserDataScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    senha: '••••••••', // Apenas simbólico
  });

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;
      const db = getDatabase();
      const userRef = ref(db, 'users/' + uid);

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUserData({
              nome: data.nome || 'Nome não informado',
              email: user.email || 'Email não disponível',
              senha: '••••••••'
            });
          } else {
            setUserData({
              nome: 'Nome não encontrado',
              email: user.email || 'Email não disponível',
              senha: '••••••••'
            });
          }
        })
        .catch((error) => {
          console.error('Erro ao buscar dados do usuário:', error);
        });
    }
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        Alert.alert("Logout", "Sua conta foi deslogada com sucesso.");
        navigation.navigate('SignIn');
      })
      .catch(error => {
        Alert.alert("Erro", "Erro ao deslogar: " + error.message);
      });
  };

  const handleChangePassword = () => {
    Alert.alert("Trocar Senha", "Aqui você poderá trocar sua senha.");


    // navigation.navigate('ChangePassword');


  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={300} style={styles.containerHeader}>
        <Text style={styles.title}>Meu Perfil</Text>
        <Text style={styles.message}>Seus dados cadastrados</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={650} style={styles.containerForm}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.info}>{userData.nome}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{userData.email}</Text>

        <Text style={styles.label}>Senha:</Text>
        <Text style={styles.info}>{userData.senha}</Text>

        <TouchableOpacity onPress={() => navigation.navigate('MyAdsScreen')} style={styles.buttonMyAds}>
          <Text style={styles.buttonTextMyAds}>Meus anúncios</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleChangePassword} style={styles.buttonChangePassword}>
          <Text style={styles.buttonTextChangePassword}>Trocar Senha</Text>
        </TouchableOpacity>

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
    backgroundColor: '#04bc64',
  },
  containerHeader:{
    marginTop: '10%',
    marginStart: '8%',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
  },
  message:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: '5%',
  },
  containerForm: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: '5%',
    marginTop: '10%',
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
  buttonMyAds: {
    backgroundColor: '#007bff',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextMyAds: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonChangePassword: {
    backgroundColor: '#f2b01e',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 10,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTextChangePassword: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#04bc64',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 10,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
