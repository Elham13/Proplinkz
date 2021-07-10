import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import InteriorCard from '../components/InteriorCard';

const DetailsScreen = ({navigation, route}) => {
  const [liked, setLiked] = useState(false);
  const handleLike = () => {
    setLiked(!liked);
  };

  const house = route.params;

  // useEffect(() => {
  //   console.log(house);
  // }, []);

  return (
    <SafeAreaView style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.backgroundImageContainer}>
          <ImageBackground style={style.backgroundImage} source={house.image}>
            <View style={style.header}>
              <View style={style.headerBtn}>
                <Icon
                  name="arrow-back-ios"
                  size={20}
                  onPress={navigation.goBack}
                />
              </View>
              <TouchableOpacity
                style={style.headerBtn}
                onPress={handleLike}
                activeOpacity={0.6}>
                {liked ? (
                  <Icon name="favorite" size={30} color={COLORS.red} />
                ) : (
                  <Icon name="favorite-border" size={30} color={COLORS.red} />
                )}
              </TouchableOpacity>
            </View>
          </ImageBackground>

          {/* Virtual Tag View */}
          <View style={style.virtualTag}>
            <Text style={{color: COLORS.white}}>{house.for}</Text>
          </View>
        </View>

        <View style={style.detailsContainer}>
          {/* Name and rating view container */}
          <View style={style.detailsWrapper}>
            <Text style={style.title}>{house.title}</Text>
            <View style={style.ratingWrapper}>
              <View style={style.ratingTag}>
                <Text style={{color: COLORS.white}}>4.8</Text>
              </View>
              <Text style={style.rating}>155 ratings</Text>
            </View>
          </View>

          {/* Location text */}
          <Text style={style.location}>{house.location}</Text>

          {/* Facilities container */}
          <View style={{flexDirection: 'row', marginTop: 20}}>
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
              <Text style={style.facilityText}>{house.area} sqft area</Text>
            </View>
          </View>
          <Text style={{marginTop: 20, color: COLORS.grey}}>
            {house.details}
          </Text>

          {/* Interior list */}
          <FlatList
            contentContainerStyle={{marginTop: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, key) => key.toString()}
            data={house.interiors}
            renderItem={({item}) => <InteriorCard interior={item} />}
          />

          {/* footer container */}
          <View style={style.footer}>
            <View>
              <Text style={style.price}>&#8377;{house.price}/month</Text>
              <Text style={style.totalPrice}>Total Price</Text>
            </View>
            <TouchableOpacity style={style.bookNowBtn} activeOpacity={0.6}>
              {house.for === 'For Rent' ? (
                <Text style={{color: COLORS.white}}>Rent Now</Text>
              ) : (
                <Text style={{color: COLORS.white}}>Buy Now</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.white},
  backgroundImageContainer: {
    elevation: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    height: 350,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingTag: {
    height: 30,
    width: 35,
    backgroundColor: COLORS.accent,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  virtualTag: {
    top: -20,
    width: 120,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: 70,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  bookNowBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  detailsContainer: {flex: 1, paddingHorizontal: 20, marginTop: 40},
  facility: {flexDirection: 'row', marginRight: 15},
  facilityText: {marginLeft: 5, color: COLORS.grey},
  detailsWrapper: {flexDirection: 'row', justifyContent: 'space-between'},
  title: {fontSize: 20, fontWeight: 'bold'},
  ratingWrapper: {flexDirection: 'row', alignItems: 'center'},
  rating: {fontSize: 13, marginLeft: 5},
  location: {fontSize: 16, color: COLORS.grey},
  price: {color: COLORS.accent, fontWeight: 'bold', fontSize: 18},
  totalPrice: {fontSize: 12, color: COLORS.grey, fontWeight: 'bold'},
});

export default DetailsScreen;
