import React, { useState } from 'react';

import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert,
  ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function RegisterPet() {

    const navigation = useNavigation();

    const [photo, setPhoto] = useState(null);

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
        Alert.alert("Anúncio publicado!", "Seu animal foi cadastrado com sucesso.");
        // ...
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
          <Animatable.View animation="fadeInLeft" delay={300} style={styles.header}>
            <Text style={styles.title}>Cadastrar animal para adoção</Text>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={500} style={styles.form}>
            <Text style={styles.label}>Nome do animal</Text>
            <TextInput style={styles.input} placeholder="Ex: Luna" />

            <Text style={styles.label}>Tipo</Text>
            <TextInput style={styles.input} placeholder="Cachorro ou Gato" />

            <Text style={styles.label}>Raça</Text>
            <TextInput style={styles.input} placeholder="Ex: SRD, Poodle..." />

            <Text style={styles.label}>Idade</Text>
            <TextInput style={styles.input} placeholder="Ex: 2 anos" />

            <Text style={styles.label}>Sexo</Text>
            <TextInput style={styles.input} placeholder="Macho ou Fêmea" />

            <Text style={styles.label}>Castrado?</Text>
            <TextInput style={styles.input} placeholder="Sim ou Não" />

            <Text style={styles.label}>Vacinado?</Text>
            <TextInput style={styles.input} placeholder="Sim ou Não" />

            <Text style={styles.label}>Temperamento</Text>
            <TextInput style={styles.input} placeholder="Ex: Calmo, brincalhão, medroso..." />

            <Text style={styles.label}>Contato para adoção</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: (99) 99999-9999"
              keyboardType="phone-pad"
            />

            <TouchableOpacity onPress={handleSelectPhoto} style={styles.photoButton}>
              <Text style={styles.photoButtonText}>Selecionar foto do animal</Text>
            </TouchableOpacity>

            {photo && (
              <Image source={{ uri: photo }} style={styles.imagePreview} />
            )}

            <TouchableOpacity onPress={handlePublish} style={styles.publishButton}>
              <Text style={styles.publishButtonText}>Publicar anúncio</Text>
            </TouchableOpacity>
          </Animatable.View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38a69d',
  },
  header: {
    marginTop: '10%',
    marginLeft: '5%',
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
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
    height: 200,
    marginTop: 10,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  publishButton: {
    backgroundColor: '#38a69d',
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
});
