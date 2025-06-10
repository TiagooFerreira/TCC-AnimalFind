import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from '@expo/vector-icons'


import Feed from "../pages/Feed";
import Profile from "../pages/profile";
import MainPage from "../pages/mainPage";

const Tab = createBottomTabNavigator();

export function TabRoutes(){
    return (
        <Tab.Navigator
        
        screenOptions={{
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#cdcdcd',
            tabBarStyle: { backgroundColor: '#04a154'},
            
        }}

        >

            <Tab.Screen
            name="Página Principal"
            component={MainPage}
            options={{headerShown: false,
                tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size}/>
            }}
            />

            <Tab.Screen 
            name="Anunciar" 
            component={Feed}
            options={{headerShown: false,
                tabBarIcon: ({ color, size }) => <Feather name="plus" color={color} size={size}/>
            }}
            />

            <Tab.Screen 
            name="Meu Perfil" 
            component={Profile}
            options={{headerShown: false,
                tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size}/>
            }}
            />
   
        </Tab.Navigator>
    )
}