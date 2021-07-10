import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../consts/colors';

const {width} = Dimensions.get('screen');

const ListOptions = ({navigation}) => {
  const optionsList = [
    {title: 'Buy a Property', img: require('../../assets/house1.jpg')},
    {title: 'Rent a Property', img: require('../../assets/house2.jpg')},
    {title: 'Lease a Property', img: require('../../assets/house3.jpg')},
  ];
  return (
    <View style={style.optionListsContainer}>
      {optionsList.map((option, index) => (
        <TouchableOpacity
          activeOpacity={0.7}
          style={style.optionsCard}
          onPress={() => {
            navigation.navigate('BuyHome', option.title);
          }}
          key={index}>
          {/* House image */}
          <Image source={option.img} style={style.optionsCardImage} />

          {/* Option title */}
          <Text style={style.text}>{option.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ListOptions;

const style = StyleSheet.create({
  optionListsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  optionsCard: {
    height: 100,
    width: width / 3 - 20,
    elevation: 15,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  optionsCardImage: {
    height: 60,
    borderRadius: 5,
    width: '100%',
  },
  text: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: '700',
  },
});
