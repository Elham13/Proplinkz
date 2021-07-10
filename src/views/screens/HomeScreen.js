import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import COLORS from '../../consts/colors';

import houses from '../../consts/houses';
import ListCategories from '../components/ListCtegories';
import ListOptions from '../components/ListOptions';
import Card from '../components/Card';
import GeneralHeader from '../../navigations/headers/generalHeader';

const {width} = Dimensions.get('screen');

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={style.container}>
      {/* Customise status bar */}
      <StatusBar
        translucent={false}
        backgroundColor={COLORS.accent}
        barStyle="light-content"
      />
      <GeneralHeader navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ListOptions navigation={navigation} />

        <ListCategories />

        <FlatList
          snapToInterval={width - 20}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={style.contentContainerStyle}
          horizontal
          data={houses}
          renderItem={({item}) => <Card house={item} navigation={navigation} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {backgroundColor: COLORS.white, flex: 1},
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },

  locationTxt: {color: COLORS.dark, fontSize: 20, fontWeight: 'bold'},
  contentContainerStyle: {
    paddingLeft: 20,
    paddingVertical: 20,
  },
});
export default HomeScreen;
