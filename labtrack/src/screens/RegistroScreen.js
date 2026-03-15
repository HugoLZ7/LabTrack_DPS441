import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import {
  TextInput,
  Button,
  Text,
  Portal,
  Modal,
  Card,
  HelperText,
} from "react-native-paper";
import { Colors } from "../theme/colors";

export default function RegistroScreen({ navigation }) {
  // Estados del formulario
  const [form, setForm] = useState({
    nombre: "",
    carnet: "",
    telefono: "",
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  // Función para formatear el teléfono (XXXX-XXXX)
  const handlePhoneChange = (text) => {
    let cleaned = text.replace(/[^0-9]/g, ""); // Solo números
    if (cleaned.length > 4) {
      cleaned = cleaned.slice(0, 4) + "-" + cleaned.slice(4, 8);
    }
    setForm({ ...form, telefono: cleaned });
  };

  const validarFormulario = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (Object.values(form).some((value) => value === "")) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    if (!emailRegex.test(form.email)) {
      setError("El formato del correo no es válido.");
      return;
    }
    if (form.telefono.length < 9) {
      // 8 dígitos + el guion
      setError("El teléfono debe tener 8 dígitos (4444-4444).");
      return;
    }

    setError(""); 
    setVisible(true); 
  };

  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/free-photo/blurred-abstract-background-interior-laboratory-medical-science-concept_7190-2525.jpg",
      }}
      style={styles.background}
      imageStyle={{ opacity: 0.2 }} 
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Text style={styles.title}>Registro</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TextInput
            label="Nombre Completo"
            value={form.nombre}
            onChangeText={(v) => setForm({ ...form, nombre: v })}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Carnet"
            value={form.carnet}
            onChangeText={(v) => setForm({ ...form, carnet: v })}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Teléfono (Ej: 4444-4444)"
            value={form.telefono}
            onChangeText={handlePhoneChange}
            keyboardType="phone-pad"
            maxLength={9}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Correo"
            value={form.email}
            onChangeText={(v) => setForm({ ...form, email: v })}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Contraseña"
            value={form.password}
            secureTextEntry
            onChangeText={(v) => setForm({ ...form, password: v })}
            mode="outlined"
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={validarFormulario}
            style={styles.button}
          >
            Registrarme
          </Button>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.link}>Volver al Login</Text>
          </TouchableOpacity>
        </Card>

        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={styles.modal}
          >
            <Text style={styles.modalTitle}>¡Registro Exitoso!</Text>
            <Text>Usuario guardado correctamente.</Text>
            <Button
              mode="contained"
              onPress={() => {
                setVisible(false);
                navigation.navigate("Login");
              }}
              style={{ marginTop: 20, backgroundColor: Colors.success }}
            >
              Ir al Login
            </Button>
          </Modal>
        </Portal>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  container: { flexGrow: 1, justifyContent: "center", padding: 20 },
  card: {
    padding: 20,
    borderRadius: 12,
    elevation: 5,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
    marginBottom: 15,
  },
  input: { marginBottom: 10 },
  button: { marginTop: 15, backgroundColor: Colors.primary },
  link: { textAlign: "center", marginTop: 15, color: "gray" },
  errorText: {
    color: Colors.danger,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  modal: {
    backgroundColor: "white",
    padding: 30,
    margin: 40,
    borderRadius: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.success,
    marginBottom: 10,
  },
});
