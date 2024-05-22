import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import Reservas from './screen/reservas';
import Habitaciones from './screen/habitaciones';
import Login from './screen/login';
import Registro from './screen/registro';
import Cuenta from './screen/cuenta';
import Huespedes from './screen/huespedes';
import Fecha from './screen/fechas';

const Hamburguesa = createDrawerNavigator();
const Stack = createStackNavigator();

const PantallaRegistro = ({ navigation }) => {
  const handleRegistro = () => {
    navigation.navigate('Cuenta');
  };

  return (
    <Registro handleRegistro={handleRegistro} />
  );
};

const DrawerContent = (props) => {
  return (
    <View style={styles.drawerContent}>
      <Text style={styles.drawerTitle}>Menú</Text> 
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Reservaciones"
          onPress={() => props.navigation.navigate('Reservas')}
          labelStyle={styles.drawerItemText} 
          
        />
        <DrawerItem
          label="Habitaciones"
          onPress={() => props.navigation.navigate('Habitaciones')}
          labelStyle={styles.drawerItemText} 
          
        />
         <DrawerItem
          label="Huespedes"
          onPress={() => props.navigation.navigate('Huespedes')}
          labelStyle={styles.drawerItemText} 
          
        />
        <DrawerItem
          label="Fechas"
          onPress={() => props.navigation.navigate('Fechas')}
          labelStyle={styles.drawerItemText} 
          
        />
         <DrawerItem
          label="Cerrar sesión"
          onPress={() => props.navigation.navigate('Login')}
          labelStyle={styles.drawerItemText} 
          
        />
      </DrawerContentScrollView>
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Hamburguesa.Navigator initialRouteName='Reservas' drawerContent={props => <DrawerContent {...props} />}>
      <Hamburguesa.Screen name="Reservas" component={Reservas} options={{ headerShown: false }} />
      <Hamburguesa.Screen name="Habitaciones" component={Habitaciones} options={{ headerShown: false }}/>
      <Hamburguesa.Screen name="Huespedes" component={Huespedes} options={{ headerShown: false }}/>
      <Hamburguesa.Screen name="Fechas" component={Fecha} options={{ headerShown: false }}/>
    </Hamburguesa.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Registro" component={PantallaRegistro} options={{ headerShown: false }} />
        <Stack.Screen name="Cuenta" component={Cuenta} options={{ headerShown: false }} />
        <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#112665',
  },
  drawerTitle: {
    color: '#FFFFFF', 
    fontWeight: 'bold', 
    fontSize: 24, 
    marginTop: 50, 
 
    textAlign:"center"
  },
  drawerItemText: {
    color: '#FFFFFF', 
    fontWeight: 'bold', 
    fontSize: 18, 
    margin:15,
    textAlign:"center"
  },
});

export default App;