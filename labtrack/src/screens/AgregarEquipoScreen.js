import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { TextInput, Button, Text, Card, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker'; // Asegúrate de haberlo instalado
import { Colors } from '../theme/colors';

export default function AgregarEquipoScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [image, setImage] = useState(null);

  // Función para seleccionar imagen de la galería
  const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Nuevo Artículo</Text>
        
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.preview} />
          ) : (
            <IconButton icon="camera-plus" size={50} onPress={pickImage} color={Colors.primary} />
          )}
          <Button onPress={pickImage}>Subir Fotografía</Button>
        </View>

        <TextInput label="Nombre del Equipo" value={nombre} onChangeText={setNombre} mode="outlined" style={styles.input} />
        <TextInput label="Categoría (Ej: Electrónica)" value={categoria} onChangeText={setCategoria} mode="outlined" style={styles.input} />
        <TextInput 
          label="Descripción Técnica" 
          value={descripcion} 
          onChangeText={setDescripcion} 
          mode="outlined" 
          multiline 
          numberOfLines={4} 
          style={styles.input} 
        />

        <Button mode="contained" onPress={() => navigation.goBack()} style={styles.button}>
          Guardar en Inventario
        </Button>
        <Button onPress={() => navigation.goBack()} color="gray">Cancelar</Button>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#F0F2F5' },
  card: { padding: 20, borderRadius: 15, elevation: 4 },
  title: { fontSize: 22, fontWeight: 'bold', color: Colors.primary, textAlign: 'center', marginBottom: 20 },
  imageContainer: { alignItems: 'center', marginBottom: 20, padding: 10, borderStyle: 'dashed', borderWidth: 1, borderColor: 'gray', borderRadius: 10 },
  preview: { width: 150, height: 150, borderRadius: 10 },
  input: { marginBottom: 15 },
  button: { marginTop: 10, backgroundColor: Colors.primary }
});