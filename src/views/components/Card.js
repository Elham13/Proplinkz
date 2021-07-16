import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';

const {width} = Dimensions.get('screen');

const Card = ({house, navigation}) => {
  // useEffect(() => {
  //   console.log('HOuser', house.photos[0]);
  // }, [house]);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('DetailsScreen', {house: house})}>
      <View style={style.card}>
        <Image source={{uri: house.photos[0]}} style={style.cardImage} />
        <View style={{marginTop: 10}}>
          <View style={style.info}>
            <Text style={style.title}>{house.propType}</Text>
            {house.purpose === 'Rent' ? (
              <Text style={style.price}>&#8377;{house.rentDetails.rent}</Text>
            ) : (
              <Text style={style.price}>
                &#8377;{house.saleDetaails.expectedPrice}
              </Text>
            )}
          </View>

          {/* Location text */}

          <Text style={style.location}>{house.location}</Text>

          {/* Facilities container */}
          <View style={style.facilityWrapper}>
            <View style={style.facility}>
              <Icon name="hotel" color={COLORS.accent} size={18} />
              <Text style={style.facilityText}>{house.bedrooms}</Text>
            </View>
            <View style={style.facility}>
              <Icon name="bathtub" color={COLORS.accent} size={18} />
              <Text style={style.facilityText}>{house.bathrooms}</Text>
            </View>
            <View style={style.facility}>
              <Icon name="aspect-ratio" color={COLORS.accent} size={18} />
              <Text style={style.facilityText}>{house.area} sqft</Text>
            </View>
            <View style={style.facility}>
              <Icon name="center-focus-weak" color={COLORS.accent} size={18} />
              <Text style={style.facilityText}>{house.purpose}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const style = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    elevation: 10,
    width: width - 40,
    marginRight: 20,
    padding: 15,
    borderRadius: 20,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  facilityWrapper: {marginTop: 10, flexDirection: 'row'},
  facility: {flexDirection: 'row', marginRight: 15},
  facilityText: {marginLeft: 5, color: COLORS.grey},
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  title: {fontSize: 16, fontWeight: 'bold'},
  price: {fontWeight: 'bold', color: COLORS.accent, fontSize: 16},
  location: {color: COLORS.grey, fontSize: 14, marginTop: 5},
});
