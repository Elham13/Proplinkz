import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AndtDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../consts/colors';
import {customStyles} from '../../consts/utils';

const HomeItem = ({data, navigation}) => {
  const handleCallTheOwner = () => {
    Linking.openURL(`tel:${data.creatorMobile}`);
  };
  const handleChat = () => {
    Linking.openURL(
      `whatsapp://send?text=Hello there, I am interested in ${data._id} property which is added in proplinkz &phone=${data.creatorMobile}`,
    );
  };
  // useEffect(() => {
  //   console.log(navigation);
  // });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.content}
        onPress={() => navigation.navigate('DetailsScreen', {house: data})}>
        <>
          <Image source={{uri: data.photos[0]}} style={styles.image} />
          <View style={styles.contentInner}>
            {data.purpose === 'Sale' ? (
              <Text style={customStyles.boldTxt}>
                &#8377; {data.saleDetaails.expectedPrice}
              </Text>
            ) : (
              <Text style={customStyles.boldTxt}>
                &#8377; {data.rentDetails.rent}
              </Text>
            )}
            <Text style={customStyles.lightSmTxt}>{data.purpose}</Text>
            <Text style={customStyles.normalTxt}>
              {data.propType}, {data.location}, {data.area}sqft
            </Text>
            <Text style={customStyles.lightTxt}>{data.location}</Text>
            <Text style={customStyles.lightTxt}>
              {data.furnished}
              <Entypo name="dot-single" color={COLORS.grey} size={12} />{' '}
              {data.floorNo} of {data.totalFloors}
            </Text>
          </View>
        </>
      </TouchableOpacity>
      <View style={[customStyles.flexRowBetween, styles.contentBottom]}>
        <TouchableOpacity activeOpacity={0.6} style={customStyles.btnOutline}>
          <Text style={customStyles.normalTxt}>
            <AndtDesign name="hearto" color={COLORS.red} size={12} /> Save
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={customStyles.btnOutline}
          onPress={handleChat}>
          <Text style={customStyles.normalTxt}>
            <FontAwesome name="whatsapp" color={COLORS.success} size={12} />{' '}
            Chat
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={customStyles.btnContain}
          onPress={handleCallTheOwner}>
          <Text style={[customStyles.normalTxt, {color: COLORS.white}]}>
            <Entypo name="phone" color={COLORS.white} size={12} /> Call owner
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeItem;

const styles = StyleSheet.create({
  container: {
    padding: 4,
    backgroundColor: COLORS.white,
    marginVertical: 2,
  },
  content: {
    flexDirection: 'row',
    paddingHorizontal: 2,
  },
  contentInner: {
    // backgroundColor: 'orange',
    flex: 1,
    paddingLeft: 6,
  },
  image: {
    width: 100,
    height: 80,
    resizeMode: 'cover',
  },
  contentBottom: {
    paddingTop: 10,
  },
});
