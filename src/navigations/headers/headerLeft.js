import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HeaderLeft = ({navigation}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={style.left}
      onPress={() => navigation.openDrawer()}>
      <Icon name="menu" size={36} />
    </TouchableOpacity>
  );
};

export default HeaderLeft;

const style = StyleSheet.create({
  left: {},
});
