import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Header from '../elemnts/Header'; // Asegúrate de importar el componente Header

export default function Reservas() {
  return (
    <View style={styles.container}>
      <Header/>
      <View>
      <Text>Contenido de la pantalla de Reservas</Text>
      </View>
    
   
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  
});
