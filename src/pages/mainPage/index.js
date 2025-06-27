import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Image, ActivityIndicator
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue } from 'firebase/database';

export default function PostList() {
  const navigation = useNavigation();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const petsRef = ref(db, 'pets');

    const unsubscribe = onValue(petsRef, (snapshot) => {
      const data = snapshot.val();
      const petList = [];

      if (data) {
        Object.entries(data).forEach(([userId, userPets]) => {
          Object.entries(userPets).forEach(([petId, pet]) => {
            petList.push({
              id: petId,
              ...pet,
            });
          });
        });
      }

      setPets(petList);
      setLoading(false);
    });

    return () => unsubscribe(); // remove listener ao desmontar
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PostDetail', { pet: item })}
    >
  {item.foto ? (
    <Image source={{ uri: item.foto }} style={styles.image} />
      ) : (
    <View style={[styles.image, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccc' }]}>
      <Text style={{ color: '#333' }}>Sem imagem</Text>
    </View>
)}
      <Text style={styles.name}>{item.nome}</Text>
      <Text style={styles.info}>{item.tipo} • {item.raca}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#04bc64" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Animais para Adoção</Text>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 30 }}>Nenhum animal cadastrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    margin: 16
  },
  list: { paddingHorizontal: 16 },
  card: {
    backgroundColor: '#04bc64',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden'
  },
  image: { width: '100%', height: 180 },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 8,
    color: '#fff',
  },
  info: {
    fontSize: 16,
    color: '#fff',
    paddingHorizontal: 8,
    paddingBottom: 8
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#04bc64'
  }
});
