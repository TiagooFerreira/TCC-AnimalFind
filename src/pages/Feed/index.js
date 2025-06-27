import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image,
  ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback,
  Keyboard, Modal
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import { getDatabase, ref, push, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { TextInputMask } from 'react-native-masked-text';

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
  const [location, setLocation] = useState(null);

  const [mapVisible, setMapVisible] = useState(false);
  const [tempMarkerLocation, setTempMarkerLocation] = useState(null); // local temporário no mapa

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const DEFAULT_IMAGE_URL = 'https://firebasestorage.googleapis.com/v0/b/animal-find-13b74.firebasestorage.app/o/images.jpg?alt=media&token=85a197fa-0bed-4c35-b73a-a86b4097b62d';

  // Função para abrir o mapa e já posicionar o marcador na localização atual ou no local salvo
  const handleSelectLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setModalMessage('Permissão de localização negada.');
      setModalVisible(true);
      return;
    }

    // Pega localização atual
    const currentLocation = await Location.getCurrentPositionAsync({});

    // Se já tiver localização salva, usa ela como inicial, senão a atual do GPS
    setTempMarkerLocation(location ? location : {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude
    });

    setMapVisible(true);
  };

  // Salvar a localização temporária no estado definitivo e fechar modal
  const handleSaveMapLocation = () => {
    if (tempMarkerLocation) {
      setLocation(tempMarkerLocation);
      setMapVisible(false);
    } else {
      setModalMessage('Por favor, selecione um local no mapa.');
      setModalVisible(true);
    }
  };

  const savePetData = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setModalMessage('Usuário não autenticado.');
      setModalVisible(true);
      return;
    }

    const db = getDatabase();
    const petRef = ref(db, 'pets/' + user.uid);
    const newPetRef = push(petRef);

    const petData = {
      nome,
      tipo,
      raca,
      idade,
      sexo,
      castrado,
      vacinado,
      temperamento,
      contato,
      criadoEm: new Date().toISOString(),
      foto: photo || DEFAULT_IMAGE_URL,
      localizacao: location ? {
        latitude: location.latitude,
        longitude: location.longitude,
      } : null
    };

    set(newPetRef, petData)
      .then(() => {
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
        setLocation(null);
      })
      .catch((error) => {
        setModalMessage('Erro ao salvar: ' + error.message);
      })
      .finally(() => {
        setModalVisible(true);
      });
  };

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

  const handlePublish = () => {
    if (
      !nome || !tipo || !raca || !idade || !sexo || !castrado ||
      !vacinado || !temperamento || !contato || !location
    ) {
      setModalMessage('Um ou mais campos estão vazios ou localização não selecionada.');
      setModalVisible(true);
      return;
    }

    savePetData();
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
            <TextInputMask
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) '
              }}
              style={styles.input}
              placeholder="Digite um número de telefone..."
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

            {location && (
              <Text style={{ marginTop: 10 }}>
                Local selecionado: {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
              </Text>
            )}

            <TouchableOpacity onPress={handlePublish} style={styles.publishButton}>
              <Text style={styles.publishButtonText}>
                <FontAwesome name="check" size={16} /> Publicar anúncio
              </Text>
            </TouchableOpacity>
          </Animatable.View>

          {/* Modal do mapa */}
          <Modal visible={mapVisible} animationType="slide">
            <View style={{ flex: 1 }}>
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: tempMarkerLocation ? tempMarkerLocation.latitude : -15.7942,
                  longitude: tempMarkerLocation ? tempMarkerLocation.longitude : -47.8822,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01
                }}
              >
                {tempMarkerLocation && (
                  <Marker
                    coordinate={tempMarkerLocation}
                    draggable
                    onDragEnd={(e) => setTempMarkerLocation(e.nativeEvent.coordinate)}
                  />
                )}
              </MapView>

              <View style={styles.modalMapButtons}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: '#aaa', flex: 1, marginRight: 10 }]}
                  onPress={() => setMapVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { flex: 1 }]}
                  onPress={handleSaveMapLocation}
                >
                  <Text style={styles.buttonText}>Salvar localização</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Modal mensagens */}
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

  modalMapButtons: {
    flexDirection: 'row',
    padding: 15,
  },

  button: {
    backgroundColor: '#04a154',
    paddingVertical: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
