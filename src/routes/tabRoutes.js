import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import Feed from "../pages/Feed";
import Profile from "../pages/profile";

const Tab = createBottomTabNavigator();

export function TabRoutes(){
    return (
        <Tab.Navigator>
            <Tab.Screen 
            name="Feed" 
            component={Feed}
            options={{headerShown: false}}
            />

            <Tab.Screen 
            name="Profile" 
            component={Profile}
            options={{headerShown: false}}
            />

        </Tab.Navigator>
    )
}