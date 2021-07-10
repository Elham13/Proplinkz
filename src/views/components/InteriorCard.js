import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';

const {width} = Dimensions.get('screen');
const InteriorCard = ({interior}) => {
  return <Image source={interior} style={style.interiorImage} />;
};

export default InteriorCard;

const style = StyleSheet.create({
  interiorImage: {
    width: width / 3 - 20,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
});
