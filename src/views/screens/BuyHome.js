import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TabBar} from 'react-native-ui-lib';
import CustomHeader from '../../navigations/headers/customHeader';
import HomeItem from '../components/HomeItem';
import houses from '../../consts/houses';
import {customStyles} from '../../consts/utils';
import {getFilteredPropsAction} from '../../redux/actions/propertyActions';
import COLORS from '../../consts/colors';

const BuyHome = ({route, navigation}) => {
  const {title, keyword} = route.params;
  const dispatch = useDispatch();
  const filtered = useSelector(state => state.filteredProps);

  useEffect(() => {
    if (title === 'Buy a Property') {
      dispatch(getFilteredPropsAction('Sale', '1'));
      return;
    }
    if (title === 'Rent a Property') {
      dispatch(getFilteredPropsAction('Rent', '1'));
      return;
    }
    dispatch(getFilteredPropsAction(keyword, '1'));
  }, [title, houses]);

  // useEffect(() => {
  //   console.log(`Title: ${title}, Keyword: ${keyword}`);
  // }, []);

  return (
    <View>
      <CustomHeader purpose={title} navigation={navigation} />
      <TabBar
        darkTheme={true}
        selectedIndex={0}
        indicatorStyle={styles.indicatore}>
        <TabBar.Item
          label="Scroll"
          labelStyle={{color: COLORS.success}}
          selectedLabelStyle={{color: COLORS.accent, fontWeight: '700'}}
        />
        <TabBar.Item
          label="View"
          labelStyle={{color: COLORS.success}}
          selectedLabelStyle={{color: COLORS.accent, fontWeight: '700'}}
          badgeProps={{size: 'pimpleSmall'}}
        />
        <TabBar.Item
          label="tab"
          labelStyle={{color: COLORS.success}}
          selectedLabelStyle={{color: COLORS.accent, fontWeight: '700'}}
        />
        <TabBar.Item
          label="bar"
          labelStyle={{color: COLORS.success}}
          selectedLabelStyle={{color: COLORS.accent, fontWeight: '700'}}
        />
        <TabBar.Item
          label="Container"
          labelStyle={{color: COLORS.success}}
          selectedLabelStyle={{color: COLORS.accent, fontWeight: '700'}}
        />
        <TabBar.Item
          label="Mode"
          labelStyle={{color: COLORS.success}}
          selectedLabelStyle={{color: COLORS.accent, fontWeight: '700'}}
        />
      </TabBar>
      {filtered.loading ? (
        <ActivityIndicator color={COLORS.accent} size="large" />
      ) : filtered.err ? (
        <Text>{filtered.err}</Text>
      ) : (
        <View style={customStyles.main}>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item._id}
            data={filtered.res.properties}
            renderItem={({item}) => (
              <HomeItem data={item} navigation={navigation} />
            )}
          />
        </View>
      )}
    </View>
  );
};

export default BuyHome;

const styles = StyleSheet.create({
  indicatore: {
    backgroundColor: COLORS.accent,
  },
});
