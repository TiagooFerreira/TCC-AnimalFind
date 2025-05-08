import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from '../pages/welcome'
import SignIn from '../pages/signIn'
import mainPage from '../pages/mainPage'
import Register from '../pages/register'
import MainPage from '../pages/mainPage'

const Stack = createNativeStackNavigator();

export default function Routes(){
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false}}
            />

            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false}}
            />

            <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false}}
            />

            <Stack.Screen
                name='MainPage'
                component={MainPage}
                options={{ headerShown: false}}
            />

        </Stack.Navigator>
    )

}