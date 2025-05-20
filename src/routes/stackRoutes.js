import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from '../pages/welcome'
import SignIn from '../pages/signIn'
import Register from '../pages/register'
import MainPage from '../pages/mainPage'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TabRoutes } from './tabRoutes'

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
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
                    component={TabRoutes}
                    options={{ headerShown: false}}
                />

            </Stack.Navigator>

        )

}