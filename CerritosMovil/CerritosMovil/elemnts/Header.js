import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();

  const toggleDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image style={styles.imagen2} source={require('../assets/hamburguesa.png')} />
      </TouchableOpacity>
      <View style={styles.placeholder}></View>
      <Image style={styles.imagen} source={require('../assets/logocerritos.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: -20,
    width: '100%',
    height: 200,
    borderRadius: 30,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    backgroundColor: '#112665',
  },
  placeholder: {
    flex: 1, 
  },
  imagen: {
    width: 60,
    height: 30,
    marginRight: 10, 
    marginTop: -20,
  },
  imagen2: {
    width:25,
    height: 25,
    marginRight: 10, 
    marginTop: -20,
    marginHorizontal:20
  },
});
