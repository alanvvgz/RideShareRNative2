import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';

// JSON de Passageiros (agora incluindo o estado para armazenar os passageiros)
const passageirosOriginais = [
  {
    "id": 1,
    "nome": "Luis Vinicius F. da Silva",
    "destino": "Av. Visc. de Suassuna, 500 - Santo Amaro",
    "veiculo": "Volkswagen Gol",
    "placa": "KIS-3473",
    "horario": "06h50",
    "whatsapp": "558127748248"
  },
  {
    "id": 2,
    "nome": "Luis Vinicius F. da Silva",
    "destino": "Av. Visc. de Suassuna, 500 - Santo Amaro",
    "veiculo": "Volkswagen CrossFox, 2020",
    "placa": "KIS-3473",
    "horario": "08h00",
    "whatsapp": "558127748248"
  },
  {
    "id": 3,
    "nome": "Adonis Vinicius Guedes",
    "destino": "Rua Dom Manuel de Medeiros, s/n - Dois Irmãos",
    "veiculo": "Fiat Palio, 2024",
    "placa": "KFH-0729",
    "horario": "07h00",
    "whatsapp": "558136848344"
  },
  {
    "id": 4,
    "nome": "Alan Vitor Vitorino",
    "destino": "Av. Prof. Moraes Rego, 1235 - Cidade Universitária",
    "veiculo": "Volkswagen Gol, 2015",
    "placa": "KIF-0253",
    "horario": "06h30",
    "whatsapp": "558135362789"
  },
  {
    "id": 5,
    "nome": "João Victor Santos",
    "destino": "R. Taguatinga, 54 - Beberibe,",
    "veiculo": "Hyundai HB20, 2022",
    "placa": "KIB-7018",
    "horario": "06h00",
    "whatsapp": "558139200231"
  },
  {
    "id": 6,
    "nome": "Mateus Caik",
    "destino": "Av. Frei Matias Teves, 280 - Ilha do Leite",
    "veiculo": "Hyundai HB20, 2022",
    "placa": "KJO-3550",
    "horario": "06h00",
    "whatsapp": "558138700548"
  }
];

const SidePageScreen = ({ navigation, route }) => {
  const [passageiros, setPassageiros] = useState(passageirosOriginais);

  useEffect(() => {
    // Verifica se há um novo motorista adicionado através da navegação
    if (route.params?.newMotorista) {
      const { newMotorista } = route.params;
      // Adiciona o novo motorista à lista de passageiros
      setPassageiros([...passageiros, newMotorista]);
    }
  }, [route.params?.newMotorista]);

  const toggleMenu = () => {
    // Implemente a lógica para alternar o menu, se necessário
    console.log('Toggle menu function');
  };

  const navigateTo = (screenName) => {
    // Implemente a navegação para a tela especificada
    navigation.navigate(screenName);
  };

  const handleExcluir = (id) => {
    // Filtra a lista de passageiros para remover o passageiro com o ID fornecido
    const novosPassageiros = passageiros.filter(passageiro => passageiro.id !== id);
    setPassageiros(novosPassageiros);
    Alert.alert('Exclusão', 'Motorista excluído com sucesso.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => toggleMenu()}>
          <Text>&#9776;</Text>
        </TouchableOpacity>
        <View style={styles.menuDropdown}>
          <TouchableOpacity onPress={() => navigateTo('sobrenos')}>
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateTo('oapp')}>
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateTo('index')}>
            <Text></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logo}>
          <TouchableOpacity onPress={() => navigateTo('Motorista')}>
            <Image source={require('../assets/images/logot.png')} style={styles.logoImage} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.headerPages}>
        <TouchableOpacity onPress={() => navigateTo('Motorista')}>
          <Text style={styles.pageText}>Motoristas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pageSelected} onPress={() => navigateTo('SidePageScreen')}>
          <Text style={[styles.pageText, styles.selectedText]}>Passageiros</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Lista de Passageiros */}
        {passageiros.map((passageiro, index) => (
          <View key={index} style={styles.passageiroCard}>
            <Text style={styles.passageiroNome}>{passageiro.nome}</Text>
            <Text style={styles.passageiroDestino}>{passageiro.destino}</Text>
            <Text style={styles.passageiroVeiculo}>{passageiro.veiculo}</Text>
            <Text style={styles.passageiroPlaca}>Placa: {passageiro.placa}</Text>
            <Text style={styles.passageiroHorario}>Horário: {passageiro.horario}</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.passageiroWhatsapp}>Contato: {passageiro.whatsapp}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleExcluir(passageiro.id)} style={styles.excluirButton}>
              <Text style={styles.excluirButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  menuDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    alignItems: 'center',
  },
  logoImage: {
    width: 40,
    height: 40,
  },
  headerPages: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  pageText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  selectedText: {
    color: '#FF9600',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  passageiroCard: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  passageiroNome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  passageiroDestino: {
    fontSize: 16,
    marginBottom: 5,
  },
  passageiroVeiculo: {
    fontSize: 16,
    marginBottom: 5,
  },
  passageiroPlaca: {
    fontSize: 14,
    marginBottom: 5,
  },
  passageiroHorario: {
    fontSize: 14,
    marginBottom: 5,
  },
  passageiroWhatsapp: {
    fontSize: 14,
    color: 'blue',
    marginBottom: 5,
  },
  excluirButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    alignItems: 'center',
  },
  excluirButtonText: {
    color: '#FFFFFF',
  },
});

export default SidePageScreen;
