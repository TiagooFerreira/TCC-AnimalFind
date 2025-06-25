import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export default function MyAdsScreen() {
  const navigation = useNavigation();

  const [myAnimals, setMyAnimals] = useState([
    {
      id: '1',
      nome: 'Levi',
      tipo: 'Cachorro',
      raca: 'Pastor Alemão',
      idade: '4 anos',
      sexo: 'Macho',
      castrado: 'Não',
      vacinado: 'Sim',
      temperamento: 'Brincalhão e amigável',
      contato: '(32) 9999-9999',
    },
    {
      id: '2',
      nome: 'Bela',
      tipo: 'Gato',
      raca: 'Angorá',
      idade: '2 anos',
      sexo: 'Fêmea',
      castrado: 'Não',
      vacinado: 'Sim',
      temperamento: 'Brincalhão e amigável',
      contato: '(11) 1111-2222',
    },
    {
      id: '3',
      nome: 'Mel',
      tipo: 'Cachorro',
      raca: 'Poodle',
      idade: '4 anos',
      sexo: 'Macho',
      castrado: 'Não',
      vacinado: 'Sim',
      temperamento: 'Brincalhão e amigável',
      contato: '(21) 5555-5555',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    const updatedList = myAnimals.filter(item => item.id !== selectedId);
    setMyAnimals(updatedList);
    setShowModal(false);
    setSelectedId(null);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => handleDelete(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>

      <Text style={styles.animalName}>{item.nome}</Text>
      <Text style={styles.animalInfo}>Tipo: {item.tipo}</Text>
      <Text style={styles.animalInfo}>Raça: {item.raca}</Text>
      <Text style={styles.animalInfo}>Idade: {item.idade}</Text>
      <Text style={styles.animalInfo}>Sexo: {item.sexo}</Text>
      <Text style={styles.animalInfo}>Castrado: {item.castrado}</Text>
      <Text style={styles.animalInfo}>Vacinado: {item.vacinado}</Text>
      <Text style={styles.animalInfo}>Temperamento: {item.temperamento}</Text>
      <Text style={styles.animalInfo}>Contato: {item.contato}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={300} style={styles.header}>
        <Text style={styles.title}>Meus Anúncios</Text>
        <Text style={styles.subtitle}>Animais cadastrados</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={600} style={styles.content}>
        <FlatList
          data={myAnimals}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Modal de confirmação */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Deseja mesmo excluir o anúncio?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setShowModal(false)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Não</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDelete} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Sim</Text>
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
  header: {
    marginTop: '10%',
    marginStart: '8%',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    marginTop: '3%',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: '5%',
    marginTop: '10%',
  },
  card: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    position: 'relative',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ff4444',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    zIndex: 1,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  animalName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  animalInfo: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  backButton: {
    backgroundColor: '#04bc64',
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
    color: '#000',
    fontWeight: 'bold',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
