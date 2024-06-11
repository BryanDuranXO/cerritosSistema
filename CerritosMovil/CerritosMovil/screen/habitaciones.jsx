import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { Card, Button } from "react-native-elements";
import Header from "../elemnts/Header";

export default function Habitaciones() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.cardWrapper}>
          <Card containerStyle={styles.cardContainer}>
            <Text style={styles.cardTitle}>Habitación 1</Text>
            <View style={styles.cardContent}>
              <Image
                source={require("../assets/h1.png")}
                style={styles.cardImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.cardText}>Estado: Ocupada</Text>
                <Text style={styles.cardText}>Fecha de entrada: 14-05-24</Text>
                <Text style={styles.cardText}>Fecha de salida: 16-05-24</Text>
                <Text style={styles.cardText2}>
                  Huésped: Jose Luis Arellano
                </Text>
                <View style={styles.buttonContainer}>
                  <Button
                    title="Habilitar"
                    buttonStyle={styles.smallButton}
                    titleStyle={styles.smallButtonText}
                  />
                  <Button
                    title="Deshabilitar"
                    buttonStyle={styles.smallButton2}
                    titleStyle={styles.smallButtonText}
                  />
                </View>
              </View>
            </View>
          </Card>
          
        </View>
        <View style={styles.cardWrapper}>
          <Card containerStyle={styles.cardContainer}>
            <Text style={styles.cardTitle}>Habitación 14</Text>
            <View style={styles.cardContent}>
              <Image
                source={require("../assets/h2.png")}
                style={styles.cardImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.cardText}>Estado:Disponible</Text>
                <Text style={styles.cardText}>Capacidad:6 personas</Text>
                <Text style={styles.cardText2}>Precio:$4,800</Text>
               
                <View style={styles.buttonContainer}>
                  <Button
                    title="Habilitar"
                    buttonStyle={styles.smallButton}
                    titleStyle={styles.smallButtonText}
                  />
                  <Button
                    title="Deshabilitar"
                    buttonStyle={styles.smallButton2}
                    titleStyle={styles.smallButtonText}
                  />
                </View>
              </View>
            </View>
          </Card>
          
        </View>
        <View style={styles.cardWrapper}>
          <Card containerStyle={styles.cardContainer}>
            <Text style={styles.cardTitle}>Habitación 7</Text>
            <View style={styles.cardContent}>
              <Image
                source={require("../assets/h3.png")}
                style={styles.cardImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.cardText}>Estado: Ocupada</Text>
                <Text style={styles.cardText}>Fecha de entrada: 14-05-24</Text>
                <Text style={styles.cardText}>Fecha de salida :19-05-24</Text>
                <Text style={styles.cardText2}>
                Huésped:Jose Gonzalez
                </Text>
                <View style={styles.buttonContainer}>
                  <Button
                    title="Habilitar"
                    buttonStyle={styles.smallButton}
                    titleStyle={styles.smallButtonText}
                  />
                  <Button
                    title="Deshabilitar"
                    buttonStyle={styles.smallButton2}
                    titleStyle={styles.smallButtonText}
                  />
                </View>
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
    marginBottom: 80,
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
    fontSize: 12,
    margin: 3,
  },
  cardText2: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  smallButton: {
    backgroundColor: "#209E00",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  smallButton2: {
    backgroundColor: "#B50505",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  smallButtonText: {
    fontSize: 12,
  },
});
