import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image,
  ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback,
  Keyboard, Modal
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

export default function RegisterPet() {
  const navigation = useNavigation();

  const [photo, setPhoto] = useState(null);
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  const [castrado, setCastrado] = useState('');
  const [vacinado, setVacinado] = useState('');
  const [temperamento, setTemperamento] = useState('');
  const [contato, setContato] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSelectPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSelectLocation = () => {
    // Aqui você pode integrar com mapa/GPS futuramente
    setModalMessage('Funcionalidade de localização ainda não implementada.');
    setModalVisible(true);
  };

  const handlePublish = () => {
    if (
      !nome || !tipo || !raca || !idade || !sexo || !castrado ||
      !vacinado || !temperamento || !contato || !photo
    ) {
      setModalMessage('Um ou mais campos sem informação.');
    } else {
      setModalMessage('Anúncio publicado com sucesso.');
      setNome('');
      setTipo('');
      setRaca('');
      setIdade('');
      setSexo('');
      setCastrado('');
      setVacinado('');
      setTemperamento('');
      setContato('');
      setPhoto(null);
    }
    setModalVisible(true);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
          <Animatable.View animation="fadeInLeft" delay={300} style={styles.header}>
            <Text style={styles.title}>Cadastrar animal para Adoção</Text>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={500} style={styles.form}>
            <Text style={styles.label}>Nome do animal</Text>
            <TextInput style={styles.input} placeholder="Ex: Luna" value={nome} onChangeText={setNome} />

            <Text style={styles.label}>Tipo</Text>
            <TextInput style={styles.input} placeholder="Cachorro ou Gato" value={tipo} onChangeText={setTipo} />

            <Text style={styles.label}>Raça</Text>
            <TextInput style={styles.input} placeholder="Ex: SRD, Poodle..." value={raca} onChangeText={setRaca} />

            <Text style={styles.label}>Idade</Text>
            <TextInput style={styles.input} placeholder="Ex: 2 anos" value={idade} onChangeText={setIdade} />

            <Text style={styles.label}>Sexo</Text>
            <TextInput style={styles.input} placeholder="Macho ou Fêmea" value={sexo} onChangeText={setSexo} />

            <Text style={styles.label}>Castrado?</Text>
            <TextInput style={styles.input} placeholder="Sim ou Não" value={castrado} onChangeText={setCastrado} />

            <Text style={styles.label}>Vacinado?</Text>
            <TextInput style={styles.input} placeholder="Sim ou Não" value={vacinado} onChangeText={setVacinado} />

            <Text style={styles.label}>Temperamento</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Calmo, brincalhão, medroso..."
              value={temperamento}
              onChangeText={setTemperamento}
            />

            <Text style={styles.label}>Contato para adoção</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: (99) 99999-9999"
              keyboardType="phone-pad"
              value={contato}
              onChangeText={setContato}
            />

            <TouchableOpacity onPress={handleSelectPhoto} style={styles.photoButton}>
              <Text style={styles.photoButtonText}>
                <FontAwesome name="camera" size={16} /> Selecionar foto do animal
              </Text>
            </TouchableOpacity>

            {photo && (
              <>
                <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16 }}>Pré-visualização:</Text>
                <Image source={{ uri: photo }} style={styles.imagePreview} />
              </>
            )}

            <TouchableOpacity onPress={handleSelectLocation} style={styles.locationButton}>
              <Text style={styles.locationButtonText}>
                <FontAwesome name="map-marker" size={16} /> Selecionar localização
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePublish} style={styles.publishButton}>
              <Text style={styles.publishButtonText}>
                <FontAwesome name="check" size={16} /> Publicar anúncio
              </Text>
            </TouchableOpacity>
          </Animatable.View>

          <Modal
            transparent
            visible={modalVisible}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalText}>{modalMessage}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04a154',
  },
  header: {
    marginTop: '10%',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    marginTop: 20,
  },
  label: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 40,
    marginBottom: 8,
    fontSize: 16,
  },
  photoButton: {
    marginTop: 20,
    backgroundColor: '#ddd',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  photoButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 250,
    marginTop: 16,
    borderRadius: 12,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: '#04bc64',
  },
  locationButton: {
    marginTop: 16,
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  locationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  publishButton: {
    backgroundColor: '#04bc64',
    marginTop: 30,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  publishButtonText: {
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
    padding: 25,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#04bc64',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 6,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
