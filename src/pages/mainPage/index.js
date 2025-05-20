import React, { use } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView
 } from 'react-native'

 import * as Animatable from 'react-native-animatable'

 import { useNavigation } from '@react-navigation/native'

export default function MainPage(){

    const navigation = useNavigation();

    return (
        <ScrollView>

            <Text style={styles.containerText}>Anuncio</Text>
            <Text style={styles.containerText}>Tela Principal</Text>
            <Text style={styles.containerText}>Tela Principal</Text>
            <Text style={styles.containerText}>Tela Principal</Text>
            <Text style={styles.containerText}>Tela Principal</Text>
            <Text style={styles.containerText}>Tela Principal</Text>
            <Text style={styles.containerText}>Tela Principal</Text>
            <Text style={styles.containerText}>Tela Principal</Text>
            <Text style={styles.containerText}>Tela Principal</Text>

        </ScrollView >
    );
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: 'cyan'
    },

    containerText:{
        textAlign: 'center',
        marginTop: 300,
        fontSize: 50,
    },





})