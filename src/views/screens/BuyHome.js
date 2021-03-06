import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
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
      dispatch(getFilteredPropsAction({purpose: 'Sale'}));
      return;
    }
    if (title === 'Rent a Property') {
      dispatch(getFilteredPropsAction({purpose: 'Rent'}));
      return;
    }
    if (title === 'Search Result') {
      dispatch(getFilteredPropsAction({locations: [keyword]}));
      return;
    }
  }, [title, houses]);

  // useEffect(() => {
  //   console.log(`Title: ${title}, Keyword: ${keyword}`);
  // }, []);

  return (
    <View>
      <CustomHeader purpose={title} navigation={navigation} showFilter={true} />

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

const styles = StyleSheet.create({});
