import React, {  useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync, } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

export default function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function loadInicialPosition() {
      const { granted } = await requestPermissionsAsync();

      if(granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        })
      }
    }
    loadInicialPosition();
  }, [])

  if(!currentRegion) {
    return null;
  }

  return (
    <>
    <MapView 
      initialRegion={currentRegion}
      style={styles.map} 
    >
      <Marker coordinate={{latitude: -22.8450304, longitude: -47.1212032} }>
        <Image style={styles.avatar} source={{uri: 'https://avatars3.githubusercontent.com/u/54908803?s=460&v=4'}} />

        <Callout onPress={() => navigation.navigate('Profile', { github_username: 'leoobarbosa2'})}>
          <View style={styles.callout} >
            <Text style={styles.devName}>Leonardo Barbosa</Text>
            <Text style={styles.devBio}>Desenvolvedor javascript, apaixonado pela capacidade que a tecnologia tem de mudar o mundo</Text>
            <Text style={styles.devtechs}>ReactJS, React-Native, NodeJS</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
    <View style={styles.searchForm}>
      <TextInput 
        style={styles.searchInput} 
        placeholder="Buscar devs por techs ..."
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
      />

      <TouchableOpacity onPress={() => {}} style={styles.loadButton}>
        <MaterialIcons name="my-location" size={20} color="#FFF"/>
      </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  avatar: {
    height: 54,
    width: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF',
    borderRadius: 26
  },
  callout: {
    width: 260,
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  devBio: {
    color: '#666',
    marginTop: 5
  },
  devTechs: {
    marginTop: 5
  },
  searchForm: {
    position: 'absolute',
    left: 0,
    top: 20,
    left: 20,
    right: 5,
    zIndex: 5,
    flexDirection: 'row'
  }, 
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#FFF",
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2,
    
  },
    loadButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#7159c1',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 15
    }
})