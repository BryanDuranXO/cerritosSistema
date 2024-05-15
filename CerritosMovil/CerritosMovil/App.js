import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';


import  'react-native-gesture-handler';
import Reservas from './screen/reservas';
import Habitaciones from './screen/habitaciones';
//Crear el drawer
const Hamburguesa =createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Hamburguesa.Navigator>
        <Hamburguesa.Screen name ="Reservas" component={Reservas}/>
        <Hamburguesa.Screen name="Habitaciones" component={Habitaciones}/>
      </Hamburguesa.Navigator>
    </NavigationContainer>
  );
}


