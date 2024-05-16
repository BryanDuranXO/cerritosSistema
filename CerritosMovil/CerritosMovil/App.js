import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React from 'react';

import 'react-native-gesture-handler';
import Reservas from './screen/reservas';
import Habitaciones from './screen/habitaciones';
import Login from './screen/login';
import Registro from './screen/registro';

// Crear el drawer
const Hamburguesa = createDrawerNavigator();


const PantallaRegistro = () => {
  const navigation = useNavigation();

  const handleRegistro = () => {
    navigation.navigate('Registrar');
  };

  return (
    <Registro handleRegistro={handleRegistro} />
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Hamburguesa.Navigator initialRouteName='Reservas'>
        <Hamburguesa.Screen name ="Login" component={Login} options={{ headerShown: false }} />
        <Hamburguesa.Screen name ="Registro" component={PantallaRegistro} options={{ headerShown: false }} />
        <Hamburguesa.Screen name="Habitaciones" component={Habitaciones} />
      </Hamburguesa.Navigator>
    </NavigationContainer>
  );
}
