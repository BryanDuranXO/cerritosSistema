import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Text,
  Dimensions,
} from "react-native";

import { Card } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

const windowHeight = Dimensions.get("window").height;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleForgotPassword = () => {
    navigation.navigate("Registro");
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/holi.png")} />
      <Card containerStyle={styles.cardContainer}>
        <View>
          <Text style={styles.welcomeText}>¡Bienvenido puto!</Text>
          <Text style={styles.baseText}>Usuario</Text>
          <TextInput style={styles.input} />
          <Text style={styles.baseText}>Contraseña</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput style={[styles.input, styles.passwordInput]} 
             secureTextEntry={!showPassword} />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.passwordToggle}
            >
              <FontAwesome
                name={showPassword ? "eye" : "eye-slash"}
                size={20}
                color="#000"
                marginRight={10}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.forgotPasswordText}>
            ¿Olvidaste tu contraseña?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.forgotPasswordText2}>
            ¿No tienes una cuenta?{" "}
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.registerText}>Regístrate</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </Card>
      <View style={[styles.circle, { height: windowHeight * 0.4 }]}></View>
      <View style={[styles.circleTop, { height: windowHeight * 0.3 }]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  forgotPasswordText2: {
    marginTop: 10,
    color: "#FFFFFF",
    textAlign: "center",
  },
  registerText: {
    color: "#389FFF",
    textDecorationLine: "underline",
  },
  welcomeText: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 40,
    marginBottom: 20,
    textAlign: "center",
  },
  logo: {
    height: "30%",
    aspectRatio: 1,
    zIndex: 1,
  },
  cardContainer: {
    width: "80%",
    backgroundColor: "#112665",
    borderRadius: 10,
    zIndex: 1,
    marginTop: 20,
    padding: 20,
  },
  circle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#72BCED",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 350,
    zIndex: 0,
  },
  circleTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#72BCED",
    borderBottomLeftRadius: 350,
    borderBottomRightRadius: 0,
    zIndex: 0,
  },
  baseText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 5,
    marginTop: 25,
    color: "#FFFFFF",
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    borderRadius: 5,
    marginTop: 10,
    height: 40,
    alignSelf: "center",
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "#FF0808",
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
    width: "80%",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
  },
  forgotPasswordText: {
    marginTop: 10,
    color: "#8DAAF4",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  modalContainer: {
    backgroundColor: "#E5EBF6",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#191970",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  warningCircle: {
    backgroundColor: "#72BCED",
    width: 90,
    height: 90,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    marginLeft: 25,
    marginRight: 20,
  },
  passwordToggle: {
    paddingHorizontal: 10,
    position: "absolute",
    right: 10,
  },
});
