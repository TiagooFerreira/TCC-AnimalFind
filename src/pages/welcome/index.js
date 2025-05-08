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

export default function Welcome(){

    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <View style={styles.containerLogo}>
                <Animatable.Image
                    animation='flipInY'
                    source={require('../../assets/Logo.png')}
                    style = {{ width: '100%' }}
                    resizeMode="contain"
                />
            </View>  

            <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>

                <Text style={styles.containerTitle}>Adotar é um ato de amor!</Text>
                <Text style={styles.containerText}>Faça o login para comerçar</Text>

                <TouchableOpacity style={styles.button}
                onPress={ () => navigation.navigate('SignIn')}
                >
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>
            </Animatable.View>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#38A69D'
    },
    containerLogo:{
        flex:2,
        backgroundColor: '#38A69D',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerForm:{
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    containerTitle:{
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12
    },
    containerText:{
        color: '#a1a1a1'
    },
    button:{
        position: 'absolute',
        backgroundColor: '#38A69D',
        borderRadius: 50,
        paddingVertical: 8,
        width: '70%',
        alignSelf: 'center',
        bottom: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText:{
        fontSize: 25,
        color: '#FFF',
        fontWeight: 'bold'
    }
})