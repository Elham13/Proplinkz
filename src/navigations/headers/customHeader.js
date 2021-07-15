import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../consts/colors';

const CustomHeader = ({purpose, navigation, onlyBack}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.btn}
        onPress={() => navigation.goBack()}>
        <Icon name="keyboard-arrow-left" color={COLORS.white} size={24} />
      </TouchableOpacity>
      <Text style={styles.title}>{purpose}</Text>
      <View style={{flexDirection: 'row'}}>
        {!onlyBack && (
          <>
            <TouchableOpacity activeOpacity={0.6} style={styles.btn}>
              <Icon name="share" color={COLORS.white} size={24} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} style={styles.btn}>
              <Ionicons name="heart-outline" color={COLORS.white} size={24} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.accent,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    padding: 5,
  },
  title: {color: COLORS.white, fontSize: 16, fontWeight: '700'},
});
