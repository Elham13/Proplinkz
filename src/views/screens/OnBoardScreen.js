import React from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Carousel, Image} from 'react-native-ui-lib';
import COLORS from '../../consts/colors';
const OnBoardScreen = ({navigation}) => {
  return (
    <SafeAreaView style={style.constainer}>
      <StatusBar translucent backgroundColor={COLORS.accent} />

      <Carousel
        key={7}
        loop={true}
        autoplayInterval={1500}
        animated={true}
        pageControlPosition="under"
        pageWidth={500}
        itemSpacings={30}
        autoplay={true}
        showCounter={true}>
        <Image
          source={require('../../assets/house1.jpg')}
          style={style.image}
        />
        <Image
          source={require('../../assets/house2.jpg')}
          style={style.image}
        />
        <Image
          source={require('../../assets/house3.jpg')}
          style={style.image}
        />
        <Image
          source={require('../../assets/house4.jpg')}
          style={style.image}
        />
      </Carousel>

      <View style={{paddingHorizontal: 20, paddingTop: 20}}>
        <View>
          <Text style={style.title}>Find your</Text>
          <Text style={style.title}>sweet home</Text>
        </View>

        <View style={{marginTop: 10}}>
          <Text style={style.textStyle}>
            Schedule visits in just a few clicks
          </Text>
          <Text style={style.textStyle}>visit in just a few clicks</Text>
        </View>
        <TouchableOpacity
          style={style.btn}
          onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={{color: 'white'}}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: COLORS.light,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  image: {
    height: 340,
    width: '100%',
    borderBottomLeftRadius: 100,
  },
  btn: {
    height: 60,
    backgroundColor: COLORS.accent,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {fontSize: 32, fontWeight: 'bold'},
  textStyle: {fontSize: 16, color: COLORS.grey},
});
export default OnBoardScreen;
