import React from 'react';
import { StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { BottomTabs } from './src/routes/tabRoutes';
import Routes from './src/routes';

export default function App() {
  return (

        <Routes />

  );
}