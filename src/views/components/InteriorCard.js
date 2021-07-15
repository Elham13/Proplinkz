import React from 'react';
import {StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';

const {width} = Dimensions.get('screen');
const InteriorCard = ({interior, handleClick, i}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={() => handleClick(i)}>
      <Image source={{uri: interior}} style={style.interiorImage} />
    </TouchableOpacity>
  );
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
