import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Cuenta() {
    const [showPassword, setShowPassword] = useState([false, false]);

    const navigation = useNavigation();
    const handleGoBack = () => {
        navigation.navigate('Registro');
    };

    const handleTogglePassword = (index) => {
        const updatedShowPassword = [...showPassword];
        updatedShowPassword[index] = !updatedShowPassword[index];
        setShowPassword(updatedShowPassword);
    }

  return (
    <View style={styles.container}>
        <View style={styles.rowContainer2}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Image source={require("../assets/back.png")} style={styles.image} />
      </TouchableOpacity>
        <Text style={styles.welcomeText}>¡Crear una Cuenta!</Text>
      </View>

     
      <View style={styles.rowContainer}>
        <Image
          source={require("../assets/dos.png")}
          style={styles.image}
        />
        <Text style={styles.dataPerson}>Datos de la cuenta</Text>
      </View>
      <Image style={styles.logo} source={require("../assets/cuenta.png")} />
    
      <View style={styles.inputContainer}>
        <Text style={styles.baseText}>Correo electrónico</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.baseText}>Nombre de usuario</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.baseText}>Contraseña</Text>
        <View style={styles.passwordInputContainer}>
            <TextInput style={[styles.input, styles.passwordInput]} secureTextEntry={!showPassword[0]} />
            <TouchableOpacity
              onPress={() => handleTogglePassword(0)}
              style={styles.passwordToggle}
            >
              <FontAwesome
                name={showPassword[0] ? "eye" : "eye-slash"}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.baseText}>Confirmar contraseña</Text>
        <View style={styles.passwordInputContainer}>
            <TextInput style={[styles.input, styles.passwordInput]} secureTextEntry={!showPassword[1]} />
            <TouchableOpacity
              onPress={() => handleTogglePassword(1)}
              style={styles.passwordToggle}
            >
              <FontAwesome
                name={showPassword[1] ? "eye" : "eye-slash"}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Crear cuenta</Text>
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
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  passwordInput: {
    flex: 1,
    marginLeft: -5,
    marginRight: -3,
  },
  passwordToggle: {
    position: "absolute",
    right: 10,
  },
});
