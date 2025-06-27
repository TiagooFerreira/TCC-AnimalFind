import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import { getAuth, signOut, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function UserDataScreen() {
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    senha: '••••••••',
  });

  const [showModal, setShowModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
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
              senha: '••••••••',
            });
          }
        })
        .catch((error) => {
          console.error('Erro ao buscar dados do usuário:', error);
        });
    }
  }, []);

const handleLogout = () => {
  Alert.alert(
    'Confirmação',
    'Você tem certeza que deseja sair?',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => {
          signOut(auth)
            .then(() => {
              Alert.alert("Logout", "Sua conta foi deslogada com sucesso.");
              navigation.navigate('SignIn');
            })
            .catch(error => {
              Alert.alert("Erro", "Erro ao deslogar: " + error.message);
            });
        }
      }
    ]
  );
};

  const handleChangePassword = () => {
    setShowModal(true);
  };

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      Alert.alert("Sucesso", "Senha atualizada com sucesso.");
      setShowModal(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
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

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Trocar Senha</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Senha atual"
                secureTextEntry={!showCurrentPassword}
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
              <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                <MaterialCommunityIcons
                  name={showCurrentPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="#333"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Nova senha"
                secureTextEntry={!showNewPassword}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                <MaterialCommunityIcons
                  name={showNewPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="#333"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Confirmar nova senha"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <MaterialCommunityIcons
                  name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="#333"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setShowModal(false)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePasswordUpdate} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04bc64',
  },
  containerHeader: {
    marginTop: '10%',
    marginStart: '8%',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
  },
  message: {
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
    alignItems: 'center',
  },
  buttonTextChangePassword: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#04bc64',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 10,
    marginTop: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontWeight: 'bold',
    color: '#000',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#04bc64',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
