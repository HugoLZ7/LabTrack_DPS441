import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";
import { Colors } from '../theme/colors';

export default function RecuperarScreen({ navigation }) {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Recuperar Acceso</Text>
        <Text style={styles.subtitle}>
          Escribe tu correo institucional para enviarte un código de
          recuperación.
        </Text>

        <TextInput
          label="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={() => alert("Función en desarrollo")}
          style={styles.button}
        >
          Enviar Código
        </Button>
        <Button onPress={() => navigation.goBack()} color="grey">
          Cancelar
        </Button>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.background,
  },
  card: { padding: 25, borderRadius: 12, elevation: 5 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: { textAlign: "center", color: "gray", marginBottom: 20 },
  input: { marginBottom: 15 },
  button: { backgroundColor: Colors.primary, marginBottom: 10 },
});
