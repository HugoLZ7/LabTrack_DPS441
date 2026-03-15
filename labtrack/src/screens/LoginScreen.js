import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import {
  TextInput,
  Button,
  Text,
  Card,
  Portal,
  Modal,
} from "react-native-paper";
import { Colors } from "../theme/colors";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  const validarLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      setError("Por favor, ingresa tus credenciales.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("El formato del correo no es válido.");
      return;
    }

    setError(""); 
    setVisible(true); 

    
    setTimeout(() => {
      setVisible(false);
      // navigation.navigate('AdminDashboard');
    }, 2000);
  };

  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/free-photo/blurred-abstract-background-interior-laboratory-medical-science-concept_7190-2525.jpg",
      }}
      style={styles.background}
      imageStyle={{ opacity: 0.25 }}
    >
      <View style={styles.container}>
        <Card style={styles.card}>
          <Text style={styles.title}>LabTrack</Text>
          <Text style={styles.subtitle}>Gestión de Inventario y Préstamos UDB</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TextInput
            label="Correo Institucional"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError("");
            }}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            left={<TextInput.Icon icon="email" />}
          />

          <TextInput
            label="Contraseña"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError("");
            }}
            secureTextEntry
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="lock" />}
          />

          <Button
            mode="contained"
            onPress={validarLogin}
            style={styles.button}
            contentStyle={{ height: 45 }}
          >
            Iniciar Sesión
          </Button>

          <View style={styles.footerLinks}>
            <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
              <Text style={styles.linkText}>
                ¿No tienes cuenta? <Text style={styles.bold}>Regístrate</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Recuperar")}>
              <Text style={styles.forgotText}>Olvidé mi contraseña</Text>
            </TouchableOpacity>
          </View>
        </Card>

        
        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={styles.modal}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={styles.modalTitle}>¡Inicio de Sesión Exitoso!</Text>
              <Text style={{ textAlign: "center" }}>
                Bienvenido al sistema de laboratorio.
              </Text>
            </View>
          </Modal>
        </Portal>

        
        <Text style={styles.licenseText}>Licensed under CC BY-NC-SA 4.0</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  container: { flex: 1, justifyContent: "center", padding: 20 },
  card: {
    padding: 25,
    borderRadius: 15,
    elevation: 8,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.primary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "gray",
    marginBottom: 25,
  },
  input: { marginBottom: 15 },
  button: { marginTop: 10, backgroundColor: Colors.primary, borderRadius: 8 },
  errorText: {
    color: Colors.danger,
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "bold",
  },
  footerLinks: { marginTop: 25, alignItems: "center" },
  linkText: { color: Colors.text, fontSize: 14 },
  bold: { fontWeight: "bold", color: Colors.primary },
  forgotText: { color: "gray", fontSize: 12, marginTop: 15 },
  modal: {
    backgroundColor: "white",
    padding: 30,
    margin: 40,
    borderRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.success,
    marginBottom: 10,
  },
  licenseText: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    fontSize: 10,
    color: "#555",
  },
});
