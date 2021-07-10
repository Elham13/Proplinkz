import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AndtDesign from 'react-native-vector-icons/AntDesign';
import COLORS from '../../consts/colors';
import {customStyles} from '../../consts/utils';

const HomeItem = ({data}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.6} style={styles.content}>
        <>
          <Image source={data.interiors[0]} style={styles.image} />
          <View style={styles.contentInner}>
            <Text style={customStyles.boldTxt}>&#8377; {data.price}</Text>
            <Text style={customStyles.lightSmTxt}>
              {data.for.split(' ')[1]}
            </Text>
            <Text style={customStyles.normalTxt}>
              {data.bedrooms} {data.subType} {data.type} {data.area} sqft
            </Text>
            <Text style={customStyles.lightTxt}>{data.location}</Text>
            <Text style={customStyles.lightTxt}>
              {data.furnished}
              <Entypo name="dot-single" color={COLORS.grey} size={12} />{' '}
              {data.floor} of {data.floorCount}
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
        <TouchableOpacity activeOpacity={0.6} style={customStyles.btnOutline}>
          <Text style={customStyles.normalTxt}>
            <Entypo name="eye" color={COLORS.grey} size={12} /> Get phone no.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} style={customStyles.btnContain}>
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
