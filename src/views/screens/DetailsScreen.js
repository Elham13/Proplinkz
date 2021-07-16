import React, {Fragment, useEffect, useState, useRef} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Toast} from 'react-native-ui-lib';
import COLORS from '../../consts/colors';
import {customStyles} from '../../consts/utils';
import InteriorCard from '../components/InteriorCard';

const DetailsScreen = ({navigation, route}) => {
  const {house} = route.params;
  const dispatch = useDispatch();

  const scrollView = useRef();

  const [imgIndex, setImgIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [popup, setPopup] = useState({
    open: false,
    color: '',
    message: '',
    position: 'top',
  });

  const handleLike = () => {
    setLiked(true);
  };

  const handleDislike = () => {
    setLiked(false);
  };

  const handleGetOwner = () => {
    scrollView.current.scrollTo({x: 0, y: 0, animated: true});
    setPopup({
      open: true,
      color: COLORS.success,
      message: `Name: ${house.creatorName} \nMobile No: ${house.creatorMobile}`,
      position: 'top',
    });
  };

  const handleImgIndex = index => {
    setImgIndex(index);
  };

  const closePopup = () => {
    setPopup({
      open: false,
      color: '',
      message: '',
      position: 'top',
    });
  };

  return (
    <SafeAreaView style={style.container}>
      <Toast
        visible={popup.open}
        position={popup.position}
        backgroundColor={popup.color}
        message={popup.message}
        onDismiss={closePopup}
        autoDismiss={10000}
        showDismiss={true}
      />
      <ScrollView ref={scrollView} showsVerticalScrollIndicator={false}>
        <View style={style.backgroundImageContainer}>
          <ImageBackground
            style={style.backgroundImage}
            source={{uri: house.photos[imgIndex]}}>
            <View style={style.header}>
              <View style={style.headerBtn}>
                <Icon
                  name="arrow-back-ios"
                  size={20}
                  onPress={navigation.goBack}
                />
              </View>

              {/* {wishlist.loading ? (
                <ActivityIndicator color={COLORS.accent} />
              ) : ( */}
              <Fragment>
                {liked ? (
                  <TouchableOpacity
                    style={style.headerBtn}
                    onPress={handleDislike}
                    activeOpacity={0.6}>
                    <Icon name="favorite" size={30} color={COLORS.red} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={style.headerBtn}
                    onPress={handleLike}
                    activeOpacity={0.6}>
                    <Icon name="favorite-border" size={30} color={COLORS.red} />
                  </TouchableOpacity>
                )}
              </Fragment>
              {/* )} */}
            </View>
          </ImageBackground>

          <View style={style.virtualTag}>
            <Text style={{color: COLORS.white}}>{house.purpose}</Text>
          </View>
        </View>

        <View style={style.detailsContainer}>
          <View style={style.detailsWrapper}>
            <Text style={style.title}>{house.propType}</Text>
            <View style={style.ratingWrapper}>
              <View style={style.ratingTag}>
                <Text style={{color: COLORS.white}}>4.8</Text>
              </View>
              <Text style={style.rating}>155 ratings</Text>
            </View>
          </View>

          <Text style={style.location}>{house.location}</Text>

          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View style={style.facility}>
              <Icon name="hotel" color={COLORS.accent} size={18} />
              <Text style={style.facilityText}>{house.bedrooms}</Text>
            </View>
            <View style={style.facility}>
              <Icon name="bathtub" color={COLORS.accent} size={18} />
              <Text style={style.facilityText}>{house.bathrooms}</Text>
            </View>
            <View style={style.facility}>
              <Icon name="kitchen" color={COLORS.accent} size={18} />
              <Text style={style.facilityText}>{house.kitchens}</Text>
            </View>
            <View style={style.facility}>
              <MCI name="window-open-variant" color={COLORS.accent} size={18} />
              <Text style={style.facilityText}>{house.balconies}</Text>
            </View>
            <View style={style.facility}>
              <Icon name="aspect-ratio" color={COLORS.accent} size={18} />
              <Text style={style.facilityText}>{house.area} sqft</Text>
            </View>
          </View>
          {house.available === 'Immediately' ? (
            <Text
              style={[
                customStyles.normalTxt,
                {marginVertical: 4, color: COLORS.grey},
              ]}>
              Available From: {moment(new Date()).format('DD/mm/yyyy')}
            </Text>
          ) : (
            <Text
              style={[
                customStyles.normalTxt,
                {marginVertical: 4, color: COLORS.grey},
              ]}>
              Available From: {house.available}
            </Text>
          )}
          <Text
            style={[
              customStyles.normalTxt,
              {marginVertical: 4, color: COLORS.grey},
            ]}>
            Furnishing Status: {house.furnished}
          </Text>
          <Text
            style={[
              customStyles.normalTxt,
              {marginVertical: 4, color: COLORS.grey},
            ]}>
            Floor: {house.floorNo} of {house.totalFloors}
          </Text>

          <FlatList
            contentContainerStyle={{marginTop: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, key) => key.toString()}
            data={house.photos}
            renderItem={({item, index}) => (
              <InteriorCard
                interior={item}
                handleClick={handleImgIndex}
                i={index}
              />
            )}
          />

          <View style={style.footer}>
            {house.purpose === 'Rent' ? (
              <Fragment>
                <View
                  style={[customStyles.flexRowBetween, {marginVertical: 2}]}>
                  <Text style={customStyles.normalTxt}>Rent</Text>
                  <Text style={style.price}>
                    &#8377;{house.rentDetails.rent}/month
                  </Text>
                </View>
                {house.rentDetails.securityDeposit && (
                  <View
                    style={[customStyles.flexRowBetween, {marginVertical: 2}]}>
                    <Text style={customStyles.normalTxt}>Security Deposit</Text>
                    <Text style={style.price}>
                      &#8377;{house.rentDetails.securityDeposit}
                    </Text>
                  </View>
                )}
                {house.rentDetails.maintenance && (
                  <View
                    style={[customStyles.flexRowBetween, {marginVertical: 2}]}>
                    <Text style={customStyles.normalTxt}>Maintenance</Text>
                    <Text style={style.price}>
                      &#8377;{house.rentDetails.maintenance}/month
                    </Text>
                  </View>
                )}
                <View
                  style={[customStyles.flexRowBetween, {marginVertical: 2}]}>
                  <Text style={customStyles.normalTxt}>Total</Text>
                  <Text style={[style.price, {fontWeight: '700'}]}>
                    &#8377;
                    {house.rentDetails.securityDeposit +
                      house.rentDetails.maintenance +
                      house.rentDetails.rent}
                  </Text>
                </View>
              </Fragment>
            ) : (
              <Fragment>
                <View
                  style={[customStyles.flexRowBetween, {marginVertical: 2}]}>
                  <Text style={customStyles.normalTxt}>Expected Price</Text>
                  <Text style={style.price}>
                    &#8377;{house.saleDetaails.expectedPrice}
                  </Text>
                </View>
                <View
                  style={[customStyles.flexRowBetween, {marginVertical: 2}]}>
                  <Text style={customStyles.normalTxt}>Price per sqft</Text>
                  <Text style={style.price}>
                    &#8377;{house.saleDetaails.pricePerSqFt}
                  </Text>
                </View>
              </Fragment>
            )}
            <TouchableOpacity
              onPress={handleGetOwner}
              style={[
                customStyles.btnContain,
                {marginTop: 10, paddingVertical: 10},
              ]}
              activeOpacity={0.6}>
              {house.identity === 'Owner' ? (
                <Text style={{color: COLORS.white}}>Get Owner Info</Text>
              ) : house.identity === 'Agent' ? (
                <Text style={{color: COLORS.white}}>Get Agent Info</Text>
              ) : (
                <Text style={{color: COLORS.white}}>Get Builder Info</Text>
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
    backgroundColor: COLORS.light,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
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
  price: {color: COLORS.accent, fontSize: 14},
  totalPrice: {fontSize: 12, color: COLORS.grey, fontWeight: 'bold'},
});

export default DetailsScreen;
