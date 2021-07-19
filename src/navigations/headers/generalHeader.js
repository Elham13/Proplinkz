import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';

const WIDTH = Dimensions.get('window').width;

const GeneralHeader = ({navigation}) => {
  const handleSearch = txt => {
    navigation.navigate('BuyHome', {title: 'Search Result', keyword: txt});
  };

  const handleFilter = () => {
    navigation.navigate('FiltersScreen', {
      title: 'Find your dream home',
    });
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.left}
        onPress={() => navigation.openDrawer()}>
        <Icon name="menu" color="#fff" size={30} />
      </TouchableOpacity>
      <View style={styles.searchWrapper}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" color={COLORS.grey} size={25} />
          <TextInput
            placeholder="Search address, city, location"
            style={styles.input}
            onEndEditing={e => handleSearch(e.nativeEvent.text)}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.sortBtn}
          onPress={handleFilter}>
          <Icon name="tune" color={COLORS.white} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GeneralHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: WIDTH,
    elevation: 15,
    padding: 10,
    backgroundColor: COLORS.accent,
  },
  left: {
    marginRight: 10,
  },
  searchWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    flex: 1,
  },
  input: {
    padding: 0,
  },
  searchInputContainer: {
    height: 28,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 5,
    flex: 1,
  },
  sortBtn: {
    marginLeft: 10,
  },
});
