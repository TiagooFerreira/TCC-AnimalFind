import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';


export default function PostDetail({ route }) {
  const { pet } = route.params;

  // Coordenadas fixas para o exemplo — substitua com pet.latitude, pet.longitude se quiser
  const latitude = -23.55052;
  const longitude = -46.633308;

  const handleLocalizacao = () => {
    const url = `geo:${latitude},${longitude}?q=${latitude},${longitude}(Localização do Pet)`;
    const browser_url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Linking.openURL(browser_url);
        }
      })
      .catch(() => Alert.alert('Erro', 'Não foi possível abrir o mapa.'));
  };

  const handleDenunciar = () => {
    Alert.alert(
      'Denunciar',
      'Você deseja denunciar este anúncio?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => Alert.alert('Denúncia enviada') }
      ]
    );
  };

  const handleContato = () => {
    let telefone = pet.contato.replace(/[^\d]/g, ''); // Remove tudo que não é número, ex: (88) 88888-8888 vira 888888888
    const url = `tel:${telefone}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Erro', 'Não foi possível abrir o telefone.');
        }
      })
      .catch(() => Alert.alert('Erro', 'Não foi possível abrir o telefone.'));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentWrapper}>
        <Image source={{ uri: pet.foto }} style={styles.image} />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{pet.nome}</Text>

          <Text style={styles.label}>Tipo:</Text>
          <Text style={styles.value}>{pet.tipo}</Text>

          <Text style={styles.label}>Raça:</Text>
          <Text style={styles.value}>{pet.raca}</Text>

          <Text style={styles.label}>Idade:</Text>
          <Text style={styles.value}>{pet.idade}</Text>

          <Text style={styles.label}>Sexo:</Text>
          <Text style={styles.value}>{pet.sexo}</Text>

          <Text style={styles.label}>Castrado:</Text>
          <Text style={styles.value}>{pet.castrado}</Text>

          <Text style={styles.label}>Vacinado:</Text>
          <Text style={styles.value}>{pet.vacinado}</Text>

          <Text style={styles.label}>Temperamento:</Text>
          <Text style={styles.value}>{pet.temperamento}</Text>

          <Text style={styles.label}>Contato:</Text>
          <Text style={styles.value}>{pet.contato}</Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={[styles.button, styles.localizacaoButton]} onPress={handleLocalizacao}>
              <View style={styles.buttonContent}>
                <Entypo name="location-pin" size={20} color="#fff" />
                <Text style={styles.buttonText}> Localização</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.contatoButton]} onPress={handleContato}>
              <View style={styles.buttonContent}>
                <FontAwesome name="phone" size={20} color="#fff" />
                <Text style={styles.buttonText}> Fazer Contato</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.denunciarButton]} onPress={handleDenunciar}>
              <View style={styles.buttonContent}>
                <MaterialIcons name="report-problem" size={20} color="#fff" />
                <Text style={styles.buttonText}> Denunciar</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  contentWrapper: {
    width: '90%',
    alignItems: 'center',
  },
  image: {
  width: '100%',
  height: 300,
  borderRadius: 15,
  borderWidth: 3,
  borderColor: '#38a69d',  // ou qualquer cor desejada
},
  infoContainer: {
    backgroundColor: '#38a69d',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#e0e0e0',
  },
  value: {
    fontSize: 16,
    marginTop: 4,
    color: '#f5f5f5',
  },
  buttonsContainer: {
    marginTop: 30,
    width: '80%',
    alignSelf: 'center',  // centraliza horizontalmente
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 10,  // espaçamento vertical entre botões
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  localizacaoButton: {
    backgroundColor: '#2196f3',
  },
  contatoButton: {
    backgroundColor: '#4caf50',
  },
  denunciarButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonContent: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},
});