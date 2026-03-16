import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Text, Card, Title, IconButton, Badge, Button, Divider, Avatar, Portal, Modal, Searchbar } from 'react-native-paper';
import { Colors } from '../theme/colors';

const CATALOGO_EQUIPOS = [
  { id: '1', nombre: 'Microscopio Binocular B-20', cat: 'Óptica', estado: 'disponible', descripcion: 'Microscopio de alta resolución para observación de muestras biológicas.', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400' },
  { id: '2', nombre: 'Osciloscopio Digital DS', cat: 'Electrónica', estado: 'prestado', descripcion: 'Equipo para medición de señales eléctricas en tiempo real.', img: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=400' },
  { id: '3', nombre: 'Balanza Analítica Precisión', cat: 'Química', estado: 'disponible', descripcion: 'Balanza de alta precisión para pesaje de reactivos químicos.', img: 'https://labolan.es/fotos_labolan/17645.jpg0' },
  { id: '4', nombre: 'Multímetro Fluke Industrial', cat: 'Electrónica', estado: 'disponible', descripcion: 'Herramienta versátil para mantenimiento eléctrico.', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400' },
];


const MIS_PRESTAMOS = [
  { id: 'm1', nombre: 'Multímetro Fluke', fecha: '14/03/2026', estado: 'activo' },
  { id: 'm2', nombre: 'Cautín Pro X', fecha: '10/03/2026', estado: 'devuelto' },
];

export default function EstudianteDashboard({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMisPrestamosVisible, setModalMisPrestamosVisible] = useState(false); 
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);

  const onChangeSearch = query => setSearchQuery(query);

  const verDetalleEquipo = (item) => {
    setEquipoSeleccionado(item);
    setModalVisible(true);
  };

  const solicitarPrestamo = () => {
    Alert.alert(
      "Confirmar Solicitud",
      `¿Deseas solicitar el préstamo de: ${equipoSeleccionado.nombre}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Solicitar", 
          onPress: () => {
            setModalVisible(false);
            Alert.alert("Éxito", "Tu solicitud ha sido enviada al administrador.");
          } 
        }
      ]
    );
  };

  const renderItemCatalogo = ({ item }) => (
    <Card style={styles.itemCard} onPress={() => verDetalleEquipo(item)}>
      <View style={styles.row}>
        <Image source={{ uri: item.img }} style={styles.equipoImg} />
        <View style={styles.infoCol}>
          <Text style={styles.equipoName}>{item.nombre}</Text>
          <Text style={styles.equipoCat}>{item.cat}</Text>
          <Badge style={[styles.badgeMain, { backgroundColor: item.estado === 'disponible' ? Colors.success : Colors.danger }]}>
            {item.estado.toUpperCase()}
          </Badge>
        </View>
        <IconButton icon="information-outline" size={26} color={Colors.primary} />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* HEADER ESTUDIANTE CON BOTÓN DE HISTORIAL */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Hola, Estudiante</Text>
          <Button 
            icon="clipboard-list" 
            mode="text" 
            onPress={() => setModalMisPrestamosVisible(true)}
            labelStyle={styles.btnLink}
            style={{ marginLeft: -15 }}
          >
            Mis Préstamos
          </Button>
        </View>
        <Avatar.Icon size={55} icon="account" backgroundColor={Colors.primary} />
      </View>

      {/* BARRA DE BÚSQUEDA */}
      <Searchbar
        placeholder="Buscar equipo..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />

      <Text style={styles.sectionTitle}>Catálogo de Laboratorio</Text>
      
      <FlatList
        data={CATALOGO_EQUIPOS.filter(e => e.nombre.toLowerCase().includes(searchQuery.toLowerCase()))}
        renderItem={renderItemCatalogo}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />

      {/* MODAL 1: DETALLE Y SOLICITUD */}
      <Portal>
        <Modal 
          visible={modalVisible} 
          onDismiss={() => setModalVisible(false)} 
          contentContainerStyle={styles.modalFlotante}
        >
          {equipoSeleccionado && (
            <View>
              <Image source={{ uri: equipoSeleccionado.img }} style={styles.imgModalGrande} />
              <Text style={styles.nombreDetalle}>{equipoSeleccionado.nombre}</Text>
              <Divider style={styles.divider} />
              
              <Text style={styles.labelDetalle}>Descripción Técnica:</Text>
              <Text style={styles.descripcionTexto}>{equipoSeleccionado.descripcion}</Text>
              
              <View style={styles.statusRow}>
                <Text style={styles.labelDetalle}>Disponibilidad: </Text>
                <Badge style={{ backgroundColor: equipoSeleccionado.estado === 'disponible' ? Colors.success : Colors.danger }}>
                  {equipoSeleccionado.estado.toUpperCase()}
                </Badge>
              </View>

              <Button 
                mode="contained" 
                disabled={equipoSeleccionado.estado !== 'disponible'}
                onPress={solicitarPrestamo}
                style={[styles.botonAccion, { backgroundColor: equipoSeleccionado.estado === 'disponible' ? Colors.primary : 'gray' }]}
                labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
              >
                {equipoSeleccionado.estado === 'disponible' ? 'SOLICITAR PRÉSTAMO' : 'NO DISPONIBLE'}
              </Button>
              
              <Button onPress={() => setModalVisible(false)} color="gray">Cerrar</Button>
            </View>
          )}
        </Modal>
      </Portal>

      {/* MODAL 2: MIS PRÉSTAMOS (HISTORIAL PERSONAL) */}
      <Portal>
        <Modal 
          visible={modalMisPrestamosVisible} 
          onDismiss={() => setModalMisPrestamosVisible(false)} 
          contentContainerStyle={styles.modalFlotante}
        >
          <Text style={styles.modalTitleGrande}>Mi Historial</Text>
          <Divider style={styles.dividerGrueso} />
          <ScrollView style={{ marginTop: 10 }}>
            {MIS_PRESTAMOS.map((item) => (
              <View key={item.id} style={styles.modalItemGrande}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.nombreTextoGrande}>{item.nombre}</Text>
                  <Text style={styles.encargadoTextoGrande}>Fecha: {item.fecha}</Text>
                </View>
                <Badge style={{ backgroundColor: item.estado === 'activo' ? Colors.success : 'gray' }}>
                  {item.estado.toUpperCase()}
                </Badge>
              </View>
            ))}
          </ScrollView>
          <Button 
            mode="contained" 
            onPress={() => setModalMisPrestamosVisible(false)} 
            style={styles.botonCerrar}
          >
            CERRAR HISTORIAL
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 60, marginBottom: 20 },
  welcome: { fontSize: 26, fontWeight: 'bold', color: Colors.primary },
  btnLink: { fontSize: 15, color: Colors.primary, fontWeight: 'bold', textDecorationLine: 'underline' },
  roleText: { fontSize: 14, color: 'gray' },
  searchBar: { marginBottom: 20, borderRadius: 15, elevation: 2 },
  sectionTitle: { marginBottom: 15, fontSize: 18, fontWeight: 'bold', color: '#444' },
  itemCard: { marginBottom: 15, borderRadius: 18, elevation: 3 },
  row: { flexDirection: 'row', padding: 15, alignItems: 'center' },
  equipoImg: { width: 85, height: 85, borderRadius: 14 },
  infoCol: { flex: 1, marginLeft: 15 },
  equipoName: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  equipoCat: { fontSize: 13, color: 'gray', marginBottom: 6 },
  badgeMain: { alignSelf: 'flex-start', paddingHorizontal: 12, height: 26, fontSize: 10, lineHeight: 26, fontWeight: 'bold' },

  // ESTILOS MODALES
  modalFlotante: { backgroundColor: 'white', marginHorizontal: 20, padding: 25, borderRadius: 30, elevation: 25, maxHeight: '80%' },
  modalTitleGrande: { fontSize: 26, fontWeight: 'bold', color: Colors.primary, textAlign: 'center', marginBottom: 10 },
  dividerGrueso: { height: 2, backgroundColor: '#EEE', marginBottom: 10 },
  modalItemGrande: { flexDirection: 'row', marginBottom: 15, backgroundColor: '#F9F9F9', padding: 15, borderRadius: 15, alignItems: 'center' },
  nombreTextoGrande: { fontSize: 19, fontWeight: 'bold', color: '#111' },
  encargadoTextoGrande: { fontSize: 15, color: '#666', marginTop: 2 },
  imgModalGrande: { width: '100%', height: 200, borderRadius: 20, marginBottom: 15 },
  nombreDetalle: { fontSize: 24, fontWeight: 'bold', color: Colors.primary, textAlign: 'center' },
  divider: { marginVertical: 15, height: 1 },
  labelDetalle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  descripcionTexto: { fontSize: 16, color: '#666', marginVertical: 8, lineHeight: 22 },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 15 },
  botonAccion: { marginTop: 10, borderRadius: 12, paddingVertical: 8 },
  botonCerrar: { marginTop: 15, backgroundColor: Colors.primary, borderRadius: 15 },
});