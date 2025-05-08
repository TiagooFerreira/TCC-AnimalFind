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
        <View>

            <Text>Tela principal</Text>

        </View>
    );
}
