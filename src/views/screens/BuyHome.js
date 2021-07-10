import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import CustomHeader from '../../navigations/headers/customHeader';
import HomeItem from '../components/HomeItem';
import houses from '../../consts/houses';
import {customStyles} from '../../consts/utils';

const BuyHome = ({route, navigation}) => {
  const keyword = route.params;
  const [houseForSale, setHouseForSale] = useState([]);
  const [houseForRent, setHouseForRent] = useState([]);
  const [houseForLease, setHouseForLease] = useState([]);

  const findProperty = (arr, key) => {
    const result = arr.filter(a => a.for === key);
    if (result.length) {
      if (key === 'For Sale') {
        setHouseForSale(result);
      }
      if (key === 'For Rent') {
        setHouseForRent(result);
      }
      if (key === 'For Lease') {
        setHouseForLease(result);
      }
    }
  };

  useEffect(() => {
    if (keyword === 'Buy a Property') {
      findProperty(houses, 'For Sale');
    }
    if (keyword === 'Rent a Property') {
      findProperty(houses, 'For Rent');
    }
    if (keyword === 'Lease a Property') {
      findProperty(houses, 'For Lease');
    }
  }, [keyword, houses]);

  return (
    <View>
      {keyword === 'Buy a Property' ? (
        <>
          <CustomHeader purpose={keyword} navigation={navigation} />
          <View style={customStyles.main}>
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              data={houseForSale}
              renderItem={({item}) => (
                <HomeItem data={item} navigation={navigation} />
              )}
            />
          </View>
        </>
      ) : keyword === 'Rent a Property' ? (
        <>
          <CustomHeader purpose={keyword} navigation={navigation} />
          <View style={customStyles.main}>
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              data={houseForRent}
              renderItem={({item}) => (
                <HomeItem data={item} navigation={navigation} />
              )}
            />
          </View>
        </>
      ) : (
        <>
          <CustomHeader purpose={keyword} navigation={navigation} />
          <View style={customStyles.main}>
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              data={houseForLease}
              renderItem={({item}) => (
                <HomeItem data={item} navigation={navigation} />
              )}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default BuyHome;