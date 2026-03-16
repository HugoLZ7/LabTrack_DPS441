import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Text, Card, Title, FAB, IconButton, Badge, Button, Divider, Avatar, Portal, Modal, TextInput } from 'react-native-paper';
import { Colors } from '../theme/colors';

const EQUIPOS_INICIALES = [
  { id: '1', nombre: 'Microscopio Binocular B-20', cat: 'Óptica', estado: 'prestado', encargado: 'Juan Pérez', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400' },
  { id: '2', nombre: 'Osciloscopio Digital DS', cat: 'Electrónica', estado: 'danado', encargado: 'Sin asignar', img: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=400' },
  { id: '3', nombre: 'Balanza Analítica Precisión', cat: 'Química', estado: 'disponible', encargado: 'Bodega Central', img: 'https://labolan.es/fotos_labolan/17645.jpg' },
  { id: '4', nombre: 'Multímetro Fluke Industrial', cat: 'Electrónica', estado: 'prestado', encargado: 'Ana García', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400' },
];

// Datos ficticios para el historial global
const HISTORIAL_GLOBAL = [
  { id: 'h1', usuario: 'Carlos Mendoza', equipo: 'Osciloscopio', carnet: '25-1234-2022', estado: 'pendiente' },
  { id: 'h2', usuario: 'Lucía Fernández', equipo: 'Balanza Quim.', carnet: '25-5678-2021', estado: 'devuelto' },
  { id: 'h3', usuario: 'Roberto Solís', equipo: 'Multímetro', carnet: '25-9012-2023', estado: 'pendiente' },
];

export default function AdminDashboard({ navigation }) {
  const [equipos, setEquipos] = useState(EQUIPOS_INICIALES);
  const [modalFiltroVisible, setModalFiltroVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalHistorialVisible, setModalHistorialVisible] = useState(false); // Estado para el historial
  const [filtroSeleccionado, setFiltroSeleccionado] = useState('Totales');
  
  const [equipoAEditar, setEquipoAEditar] = useState({ nombre: '', cat: '', estado: '' });

  const abrirFiltro = (tipo) => {
    setFiltroSeleccionado(tipo);
    setModalFiltroVisible(true);
  };

  const prepararEdicion = (item) => {
    setEquipoAEditar(item);
    setModalEditVisible(true);
  };

  const eliminarEquipo = (id) => {
    Alert.alert("Eliminar", "¿Estás seguro de eliminar este equipo del inventario?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Eliminar", onPress: () => setEquipos(equipos.filter(e => e.id !== id)), style: "destructive" }
    ]);
  };

  const obtenerListaFiltrada = () => {
    if (filtroSeleccionado === 'Totales') return equipos;
    const key = filtroSeleccionado === 'Dañados' ? 'danado' : 'prestado';
    return equipos.filter(e => e.estado === key);
  };

  const renderItemPrincipal = ({ item }) => (
    <Card style={styles.itemCard}>
      <View style={styles.row}>
        <Image source={{ uri: item.img }} style={styles.equipoImg} />
        <View style={styles.infoCol}>
          <Text style={styles.equipoName}>{item.nombre}</Text>
          <Text style={styles.equipoCat}>{item.cat}</Text>
          <Badge style={[styles.badgeMain, { backgroundColor: item.estado === 'disponible' ? Colors.success : item.estado === 'danado' ? Colors.danger : '#f39c12' }]}>
            {item.estado.toUpperCase()}
          </Badge>
        </View>
        <View style={styles.accionesCol}>
          <IconButton icon="pencil" size={22} color={Colors.primary} onPress={() => prepararEdicion(item)} />
          <IconButton icon="trash-can" size={22} color={Colors.danger} onPress={() => eliminarEquipo(item.id)} />
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* HEADER CON BOTÓN DE HISTORIAL */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Panel de Control</Text>
          <Button 
            icon="history" 
            mode="text" 
            onPress={() => setModalHistorialVisible(true)}
            labelStyle={styles.btnLink}
            style={{ marginLeft: -15 }}
          >
            Ver Historial Préstamos
          </Button>
        </View>
        <Avatar.Image size={55} source={{ uri: 'https://i.pravatar.cc/150?u=admin' }} />
      </View>

      {/* STATS CARDS */}
      <View style={styles.statsContainer}>
        <TouchableOpacity style={styles.statCard} onPress={() => abrirFiltro('Totales')}>
           <Text style={styles.statCount}>{equipos.length}</Text>
           <Text style={styles.statLabel}>Totales</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.statCard, { borderBottomColor: Colors.danger, borderBottomWidth: 4 }]} onPress={() => abrirFiltro('Dañados')}>
           <Text style={[styles.statCount, {color: Colors.danger}]}>{equipos.filter(e => e.estado === 'danado').length}</Text>
           <Text style={styles.statLabel}>Dañados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.statCard, { borderBottomColor: '#f39c12', borderBottomWidth: 4 }]} onPress={() => abrirFiltro('Prestados')}>
           <Text style={[styles.statCount, {color: '#f39c12'}]}>{equipos.filter(e => e.estado === 'prestado').length}</Text>
           <Text style={styles.statLabel}>Prestados</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Inventario Activo</Text>
      
      <FlatList
        data={equipos}
        renderItem={renderItemPrincipal}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* MODAL 1: FILTRADO */}
      <Portal>
        <Modal visible={modalFiltroVisible} onDismiss={() => setModalFiltroVisible(false)} contentContainerStyle={styles.modalFlotante}>
          <Text style={styles.modalTitleGrande}>Detalle: {filtroSeleccionado}</Text>
          <Divider style={styles.dividerGrueso} />
          <ScrollView style={{ marginTop: 15 }}>
            {obtenerListaFiltrada().map((item) => (
              <View key={item.id} style={styles.modalItemGrande}>
                <Image source={{ uri: item.img }} style={styles.imgExtraLarge} />
                <View style={styles.modalInfoGrande}>
                  <Text style={styles.nombreTextoGrande}>{item.nombre}</Text>
                  <Text style={styles.encargadoTextoGrande}>Resp: {item.encargado}</Text>
                  <View style={[styles.badgeEnorme, { backgroundColor: item.estado === 'danado' ? Colors.danger : item.estado === 'prestado' ? '#f39c12' : Colors.success }]}>
                    <Text style={styles.badgeTexto}>{item.estado.toUpperCase()}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          <Button mode="contained" onPress={() => setModalFiltroVisible(false)} style={styles.botonCerrar}>CERRAR</Button>
        </Modal>
      </Portal>

      {/* MODAL 2: EDICIÓN */}
      <Portal>
        <Modal visible={modalEditVisible} onDismiss={() => setModalEditVisible(false)} contentContainerStyle={styles.modalEditContainer}>
          <Title style={styles.modalTitleGrande}>Editar Equipo</Title>
          <TextInput label="Nombre del Equipo" value={equipoAEditar.nombre} onChangeText={t => setEquipoAEditar({...equipoAEditar, nombre: t})} mode="outlined" style={styles.input} />
          <TextInput label="Categoría" value={equipoAEditar.cat} onChangeText={t => setEquipoAEditar({...equipoAEditar, cat: t})} mode="outlined" style={styles.input} />
          <Text style={{marginTop: 10, fontWeight: 'bold'}}>Estado actual: {equipoAEditar.estado.toUpperCase()}</Text>
          <View style={styles.editActions}>
            <Button mode="contained" onPress={() => setModalEditVisible(false)} style={{backgroundColor: Colors.success, flex: 1, marginRight: 5}}>Guardar</Button>
            <Button mode="outlined" onPress={() => setModalEditVisible(false)} style={{flex: 1}}>Cancelar</Button>
          </View>
        </Modal>
      </Portal>

      {/* MODAL 3: HISTORIAL GLOBAL */}
      <Portal>
        <Modal visible={modalHistorialVisible} onDismiss={() => setModalHistorialVisible(false)} contentContainerStyle={styles.modalFlotante}>
          <Text style={styles.modalTitleGrande}>Historial Global</Text>
          <Divider style={styles.dividerGrueso} />
          <ScrollView style={{ marginTop: 15 }}>
            {HISTORIAL_GLOBAL.map((item) => (
              <View key={item.id} style={styles.modalItemGrande}>
                <Avatar.Text size={45} label={item.usuario[0]} style={{ backgroundColor: Colors.primary }} />
                <View style={styles.modalInfoGrande}>
                  <Text style={styles.nombreTextoGrande}>{item.usuario}</Text>
                  <Text style={styles.encargadoTextoGrande}>Equipo: {item.equipo}</Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>ID: {item.carnet}</Text>
                </View>
                <Badge style={{ backgroundColor: item.estado === 'pendiente' ? '#f39c12' : Colors.success }}>
                  {item.estado.toUpperCase()}
                </Badge>
              </View>
            ))}
          </ScrollView>
          <Button mode="contained" onPress={() => setModalHistorialVisible(false)} style={styles.botonCerrar}>CERRAR HISTORIAL</Button>
        </Modal>
      </Portal>

      <FAB style={styles.fab} icon="plus" onPress={() => navigation.navigate('AgregarEquipo')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 60, marginBottom: 25 },
  welcome: { fontSize: 26, fontWeight: 'bold', color: Colors.primary },
  btnLink: { fontSize: 15, color: Colors.primary, fontWeight: 'bold', textDecorationLine: 'underline' },
  roleText: { fontSize: 14, color: 'gray' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { flex: 1, backgroundColor: 'white', marginHorizontal: 5, padding: 18, borderRadius: 18, alignItems: 'center', elevation: 4 },
  statCount: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  statLabel: { fontSize: 12, color: 'gray', fontWeight: 'bold' },
  sectionTitle: { marginBottom: 15, fontSize: 18, fontWeight: 'bold', color: '#444' },
  itemCard: { marginBottom: 15, borderRadius: 18, elevation: 3 },
  row: { flexDirection: 'row', padding: 15, alignItems: 'center' },
  equipoImg: { width: 80, height: 80, borderRadius: 14 },
  infoCol: { flex: 1, marginLeft: 15 },
  accionesCol: { alignItems: 'center' },
  equipoName: { fontSize: 17, fontWeight: 'bold', color: '#222' },
  equipoCat: { fontSize: 13, color: 'gray', marginBottom: 6 },
  badgeMain: { alignSelf: 'flex-start', paddingHorizontal: 12, height: 26, fontSize: 10, lineHeight: 26, fontWeight: 'bold' },
  modalFlotante: { backgroundColor: 'white', marginHorizontal: 15, padding: 25, borderRadius: 35, elevation: 25, maxHeight: '80%' },
  modalEditContainer: { backgroundColor: 'white', padding: 30, margin: 20, borderRadius: 25, elevation: 25 },
  modalTitleGrande: { fontSize: 26, fontWeight: 'bold', color: Colors.primary, textAlign: 'center', marginBottom: 15 },
  dividerGrueso: { height: 2, backgroundColor: '#EEE', marginBottom: 10 },
  modalItemGrande: { flexDirection: 'row', marginBottom: 20, backgroundColor: '#F9F9F9', padding: 15, borderRadius: 20, alignItems: 'center' },
  imgExtraLarge: { width: 100, height: 100, borderRadius: 15 },
  modalInfoGrande: { flex: 1, marginLeft: 18 },
  nombreTextoGrande: { fontSize: 20, fontWeight: 'bold', color: '#111' },
  encargadoTextoGrande: { fontSize: 16, color: '#555', marginVertical: 4 },
  badgeEnorme: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, alignSelf: 'flex-start' },
  badgeTexto: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  input: { marginBottom: 15 },
  editActions: { flexDirection: 'row', marginTop: 20 },
  botonCerrar: { marginTop: 15, backgroundColor: Colors.primary, borderRadius: 15 },
  fab: { position: 'absolute', margin: 20, right: 0, bottom: 25, backgroundColor: Colors.primary }
});