import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from '../pages/welcome'
import SignIn from '../pages/signIn'
import Register from '../pages/register'

import { TabRoutes } from './tabRoutes'
import PostDetail from '../pages/postDetail'

import MyAdsScreen from '../pages/myAddsScreen'

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
                    name="MainPage"
                    component={TabRoutes}
                    options={{ headerShown: false}}
                />

                <Stack.Screen
                    name="PostDetail"
                    component={PostDetail}
                    options={{headerShown: false}}
                />

                <Stack.Screen
                    name="MyAdsScreen"
                    component={MyAdsScreen}
                    options={{headerShown: false}}
                />

            </Stack.Navigator>

        )

}