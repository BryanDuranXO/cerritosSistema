import React from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import Header from "../elemnts/Header"; // Asegúrate de importar el componente Header correctamente
import { Card, Button } from "react-native-elements";

export default function Reservas() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.cardWrapper}>
          <Card containerStyle={styles.cardContainer}>
            <Text style={styles.cardTitle}>Habitación Sencilla</Text>
            <Text style={styles.cardTitle2}>5,6,11,13,16,17</Text>
            <View style={styles.cardContent}>
              <Image
                source={require("../assets/h1.png")}
                style={styles.cardImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.cardText}>
                  •Cama Matrimonial •Baño completo •Pequeño balcón
                </Text>
                <Button
                  title="Asignar"
                  buttonStyle={styles.assignButton}
                  titleStyle={styles.assignButtonText}
                />
              </View>
            </View>
          </Card>
        </View>
        <View style={styles.cardWrapper}>
          <Card containerStyle={styles.cardContainer}>
            <Text style={styles.cardTitle}>Habitación Doble</Text>
            <Text style={styles.cardTitle2}>1,2,3,7,8,9,10,12,15</Text>
            <View style={styles.cardContent}>
              <Image
                source={require("../assets/h2.png")}
                style={styles.cardImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.cardText}>
                  •Cama Matrimonial •Baño completo •Pequeño balcón
                </Text>
                <Button
                  title="Asignar"
                  buttonStyle={styles.assignButton}
                  titleStyle={styles.assignButtonText}
                />
              </View>
            </View>
          </Card>
        </View>
        <View style={styles.cardWrapper}>
          <Card containerStyle={styles.cardContainer}>
            <Text style={styles.cardTitle}>Habitación Familiar</Text>
            <Text style={styles.cardTitle2}>5,6,11,13,16,17</Text>
            <View style={styles.cardContent}>
              <Image
                source={require("../assets/h3.png")}
                style={styles.cardImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.cardText}>
                  •Cama Matrimonial •Baño completo •Pequeño balcón
                </Text>
                <Button
                  title="Asignar"
                  buttonStyle={styles.assignButton}
                  titleStyle={styles.assignButtonText}
                />
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
  },
  cardWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 80, // Añadir margen inferior para espaciar las tarjetas
  },
  cardContainer: {
    width: "95%",
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    padding: 20,
    marginTop: -50,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginRight: -180,
  },
  cardTitle2: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
    marginRight: -180,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    width: "50%",
    height: undefined,
    aspectRatio: 1,
    marginRight: 10,
    marginBottom: 9,
    marginTop: -35,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  cardText: {
    textAlign: "center",
  },
  assignButton: {
    backgroundColor: "#FFAE1F", // Color amarillo
    borderRadius: 5,
    marginTop: 20,
  },
  assignButtonText: {
    color: "#FFFFFF", // Color blanco
  },
});
