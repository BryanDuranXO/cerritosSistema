import React from "react";
import { View, StyleSheet, Text, Image, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Registro() {
  return (
    <View style={styles.container}>
        <View style={styles.rowContainer2}>
        <Image
          source={require("../assets/back.png")}
          style={styles.image}
        />
        <Text style={styles.welcomeText}>¡Crear una cuenta!</Text>
      </View>

     
      <View style={styles.rowContainer}>
        <Image
          source={require("../assets/personal.png")}
          style={styles.image}
        />
        <Text style={styles.dataPerson}>Datos Personales</Text>
      </View>
      <Image style={styles.logo} source={require("../assets/registro.png")} />
    
      <View style={styles.inputContainer}>
        <Text style={styles.baseText}>Nombre(s)</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.baseText}>Apellido paterno</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.baseText}>Apellido materno</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.baseText}>Télefono</Text>
        <TextInput style={styles.input} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#112665",
    paddingTop: 50,
  },
  welcomeText: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 35,
    textAlign: "center",
    marginBottom: 10,
  },
  dataPerson: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 25,
    textAlign: "center",
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowContainer2: {
    flexDirection: "row",
    alignItems: "center",
  
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  logo: {
    height: "25%",
    aspectRatio: 1,
    marginBottom: 9,
  },
  baseText: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
    marginTop: 5,
    color: "#FFFFFF",
  },
  inputContainer: {
    flexDirection: "column", 
    alignItems: "flex-start", 
    width: "80%",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "gray",
    borderWidth: 1,
    width: "100%", 
    borderRadius: 5,
    height: 40,
    paddingLeft: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
    color: "black",
  },
  button: {
    backgroundColor: "#1A46B8",
    paddingVertical: 9,
    paddingHorizontal: 100,
    borderRadius: 5,
    marginTop: 30,
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
  },
});
