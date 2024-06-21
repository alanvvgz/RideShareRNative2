import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import axios from 'axios';

const MotoristaScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [destino, setDestino] = useState('');
  const [veiculo, setVeiculo] = useState('');
  const [placa, setPlaca] = useState('');
  const [hora, setHora] = useState('');
  const [zap, setZap] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permissão para acesso à localização negada');
      return;
    }
  };

  const handleLocation = async () => {
    const { coords } = await getCurrentPositionAsync({});
    setLatitude(coords.latitude);
    setLongitude(coords.longitude);
  };

  const handleRegister = async () => {
    const newMotorista = {
      nome: name,
      destino: destino,
      veiculo: veiculo,
      placa: placa,
      horario: hora,
      whatsapp: zap,
      latitude: latitude,
      longitude: longitude
    };

    try {
      const response = await axios.post('http://192.168.0.109:5000/motoristas', newMotorista);
      console.log('Motorista registrado:', response.data);
      // Navegar de volta para a tela de passageiros após o registro
      navigation.navigate('SidePageScreen', { newMotorista });
    } catch (error) {
      console.error('Erro ao registrar o motorista:', error);
      Alert.alert('Erro', 'Erro ao registrar o motorista. Verifique sua conexão e tente novamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>RIDESHARE</Text>
      
      <View style={styles.headerPages}>
        <TouchableOpacity onPress={() => navigation.navigate('Motoristas')} style={styles.pageSelected}>
          <Text>Motoristas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SidePageScreen')} style={styles.sidePage}>
          <Text>Passageiros</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -8.052442830407937,
            longitude: -34.88821193857346,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {latitude && longitude && (
            <Marker
              coordinate={{ latitude, longitude }}
              title="Você está aqui"
              description="Localização atual"
            />
          )}
        </MapView>
        <TouchableOpacity style={styles.geoButton} onPress={handleLocation}>
          <Text>Obter Localização</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.motoInfo}>
        <Text style={styles.headerMotoInfo}>Adicionar rota</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Destino"
          value={destino}
          onChangeText={text => setDestino(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Veículo"
          value={veiculo}
          onChangeText={text => setVeiculo(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Placa"
          value={placa}
          onChangeText={text => setPlaca(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Hora"
          value={hora}
          onChangeText={text => setHora(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Whatsapp"
          value={zap}
          onChangeText={text => setZap(text)}
        />
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text>Registrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FF9600',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 32,
    color: '#0A0A0A',
    marginVertical: 20,
  },
  headerPages: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  pageSelected: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    paddingVertical: 10,
  },
  sidePage: {
    paddingVertical: 10,
  },
  mapContainer: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  map: {
    flex: 1,
  },
  geoButton: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    alignSelf: 'center',
  },
  motoInfo: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20,
  },
  headerMotoInfo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: 'orange',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default MotoristaScreen;
