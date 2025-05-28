import React from 'react';

import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const mockPosts = [
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
    contato: '(88) 88888-8888',
    foto: 'https://nossopastoralemao.com.br/wp-content/uploads/2021/10/pastor-alemao-filhote.jpg'
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
    contato: '(88) 88888-8888',
    foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2P34btrR7jkmZ-AVvjV3YzI4dn0pcCSHezQ&s'
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
    contato: '(88) 88888-8888',
    foto: 'https://portalmelhoresamigos.com.br/wp-content/uploads/2015/11/poodle_cachorro.png'
  },
  {
    id: '4',
    nome: 'Levi',
    tipo: 'Cachorro',
    raca: 'Pastor Alemão',
    idade: '4 anos',
    sexo: 'Macho',
    castrado: 'Não',
    vacinado: 'Sim',
    temperamento: 'Brincalhão e amigável',
    contato: '(88) 88888-8888',
    foto: 'https://placedog.net/400/300'
  }

  
];

export default function PostList() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PostDetail', { pet: item })}
    >
      <Image source={{ uri: item.foto }} style={styles.image} />
      <Text style={styles.name}>{item.nome}</Text>
      <Text style={styles.info}>{item.tipo} • {item.raca}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Animais para Adoção</Text>
      <FlatList
        data={mockPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
},
  header: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginTop: 50,
    margin: 16 
},
  list: { 
    paddingHorizontal: 16 
},
  card: {
    backgroundColor: '#38a69d',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden'
  },
  image: { 
    width: '100%', 
    height: 180 
},
  name: {
    fontSize: 20, 
    fontWeight: 'bold', 
    padding: 8 
},
  info: {
     fontSize: 16,
    color: '#fff',
    paddingHorizontal: 8,
    paddingBottom: 8 
}

});
