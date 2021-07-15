import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import COLORS from '../../consts/colors';
import {getAllPropertiesAction} from '../../redux/actions/propertyActions';

import houses from '../../consts/houses';
import ListCategories from '../components/ListCtegories';
import ListOptions from '../components/ListOptions';
import Card from '../components/Card';
import GeneralHeader from '../../navigations/headers/generalHeader';

const {width} = Dimensions.get('screen');

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const properties = useSelector(state => state.getAllProperties);

  // useEffect(() => {
  //   console.log('HOuses: ', properties);
  // }, [properties]);

  useEffect(() => {
    dispatch(getAllPropertiesAction());
  }, [dispatch]);

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

        {properties.loading ? (
          <ActivityIndicator color={COLORS.accent} size="large" />
        ) : (
          <FlatList
            snapToInterval={width - 20}
            keyExtractor={item => item._id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={style.contentContainerStyle}
            horizontal
            data={properties.res}
            renderItem={({item}) => (
              <Card house={item} navigation={navigation} />
            )}
          />
        )}
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
