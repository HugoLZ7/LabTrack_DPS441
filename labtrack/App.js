import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen';
import RegistroScreen from './src/screens/RegistroScreen';
import RecuperarScreen from './src/screens/RecuperarScreen';
import AdminDashboard from './src/screens/AdminDashboard';
import AgregarEquipoScreen from './src/screens/AgregarEquipoScreen';
import EstudianteDashboard from './src/screens/EstudianteDashboard';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registro" component={RegistroScreen} />
          <Stack.Screen name="Recuperar" component={RecuperarScreen} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          <Stack.Screen name="EstudianteDashboard" component={EstudianteDashboard} />
          <Stack.Screen name="AgregarEquipo" component={AgregarEquipoScreen} options={{ title: 'Nuevo Equipo' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}