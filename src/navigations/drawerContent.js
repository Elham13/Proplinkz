import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerContent = ({navigation}) => {
  const [user, setUser] = useState(null);

  const handlePostProperty = () => {
    user ? navigation.navigate('SelerScreen') : navigation.navigate('Login');
  };
  const handleTestScreen = () => {
    navigation.navigate('TestScreen');
  };
  useEffect(async () => {
    // await AsyncStorage.removeItem('@user');
    const user = await AsyncStorage.getItem('@user');
    if (user) {
      setUser(JSON.parse(user));
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        {/* <Image
          style={styles.img}
          source={require('../assets/pudami-logo.jpeg')}
        /> */}
        <Text style={{textAlign: 'center', fontSize: 28}}>Logo</Text>
      </View>
      <View style={styles.btnWrapper}>
        <View style={styles.drawerSection}>
          <TouchableOpacity
            style={styles.drawerNav}
            onPress={() => navigation.navigate('HomeScreen')}>
            <View style={styles.navTxtWrapper}>
              <MaterialIcons name="circle" size={10} color="#333" />
              <Text style={styles.navTxt}>Home</Text>
            </View>
            <MaterialIcons name="double-arrow" size={10} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerNav}
            onPress={handlePostProperty}>
            <View style={styles.navTxtWrapper}>
              <MaterialIcons name="circle" size={10} color="#333" />
              <Text style={styles.navTxt}>Post Property</Text>
            </View>
            <MaterialIcons name="double-arrow" size={10} color="#333" />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.drawerNav} onPress={handleTestScreen}>
            <View style={styles.navTxtWrapper}>
              <MaterialIcons name="circle" size={10} color="#333" />
              <Text style={styles.navTxt}>Test screen</Text>
            </View>
            <MaterialIcons name="double-arrow" size={10} color="#333" />
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  top: {
    backgroundColor: '#fff',
  },
  img: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  drawerSection: {
    marginTop: 5,
    backgroundColor: '#fff',
  },
  drawerNav: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navTxtWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navTxt: {
    fontSize: 11,
    marginLeft: 5,
  },
  btnWrapper: {
    borderTopWidth: 0.5,
    borderTopColor: '#999',
  },
});
