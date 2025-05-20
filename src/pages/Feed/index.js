import React, { use } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
 } from 'react-native'

 import * as Animatable from 'react-native-animatable'

 import { useNavigation } from '@react-navigation/native'

export default function MainPage(){

    const navigation = useNavigation();

    return (
        <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>

            <Text style={styles.containerText}>Tela Feed</Text>

        </Animatable.View>
    );
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    containerText:{
        textAlign: 'center',
        marginTop: 400,
        fontSize: 50,
        
    }




})