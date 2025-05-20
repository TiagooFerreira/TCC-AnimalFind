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

export default function Profile(){

    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <Text style={styles.containerText}>Tela Profile</Text>

        </View>
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