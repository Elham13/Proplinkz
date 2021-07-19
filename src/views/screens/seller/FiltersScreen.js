import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {ChipsInput} from 'react-native-ui-lib';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {getFilteredPropsAction} from '../../../redux/actions/propertyActions';
import COLORS from '../../../consts/colors';
import {customStyles, WIDTH} from '../../../consts/utils';
import CustomHeader from '../../../navigations/headers/customHeader';

const listTab = [
  {status: 'Rent', value: 'Rent'},
  {status: 'Buy', value: 'Sale'},
];
const propTypesData = [
  {id: '1', name: 'Flat'},
  {id: '2', name: 'Villa'},
  {id: '3', name: 'House'},
  {id: '4', name: 'Shop'},
];
const noOfBedrooms = [
  {id: '1', name: '1 BHK', value: 1},
  {id: '2', name: '2 BHK', value: 2},
  {id: '3', name: '3 BHK', value: 3},
  {id: '4', name: '4 BHK', value: 4},
  {id: '5', name: '5 BHK', value: 5},
  {id: '6', name: '6 BHK', value: 6},
];

const FiltersScreen = ({navigation, route}) => {
  const {title} = route.params;
  const customTag = useRef();
  const dispatch = useDispatch();

  const [buyRange, setBuyRange] = useState([50000, 1000000]);
  const [rentRange, setRentRange] = useState([3000, 100000]);
  const [status, setStatus] = useState('Rent');
  const [selectedPropType, setSelectedPropType] = useState(null);
  const [selectedNoOfBedrooms, setSelectedNoOfBedrooms] = useState(null);
  const [formData, setFormData] = useState({
    locations: [],
    propType: '',
    budgetRange: [],
    noOfBedrooms: 0,
    purpose: 'Rent',
  });

  const handleLocation = value => {
    setFormData({
      ...formData,
      locations: [...formData.locations, value],
    });
  };

  const handlePropType = item => {
    setSelectedPropType(item.id);
    setFormData({
      ...formData,
      propType: item.name,
    });
  };

  const handleNoOfBedrooms = item => {
    setSelectedNoOfBedrooms(item.id);
    setFormData({
      ...formData,
      noOfBedrooms: item.value,
    });
  };

  const renderItem = ({item}) => {
    const bgColor = item.id === selectedPropType ? COLORS.accent : COLORS.white;
    const color = item.id === selectedPropType ? COLORS.white : COLORS.accent;
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => handlePropType(item)}
        style={[styles.propType, {backgroundColor: bgColor}]}>
        <Text style={{color, fontSize: 12}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderBedrooms = ({item}) => {
    const bgColor =
      item.id === selectedNoOfBedrooms ? COLORS.accent : COLORS.white;
    const color =
      item.id === selectedNoOfBedrooms ? COLORS.white : COLORS.accent;
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => handleNoOfBedrooms(item)}
        style={[styles.propType, {backgroundColor: bgColor}]}>
        <Text style={{color, fontSize: 12}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const handleBuyRange = values => {
    setBuyRange(values);
    setFormData({
      ...formData,
      budgetRange: values,
    });
  };

  const handleRentRange = values => {
    setRentRange(values);
    setFormData({
      ...formData,
      budgetRange: values,
    });
  };

  const handleSubmit = () => {
    dispatch(getFilteredPropsAction(formData));
    // navigation.navigate('BuyHome', {title: 'Search result'});
  };

  const handleTabChange = value => {
    setStatus(value);
    setFormData({
      ...formData,
      purpose: value,
    });
  };

  // useEffect(() => {

  // }, [formData]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        purpose={title}
        navigation={navigation}
        showFilter={false}
      />
      <View style={styles.listTab}>
        {listTab.map(e => (
          <TouchableOpacity
            style={[styles.btnTab, status === e.value && styles.btnTabActive]}
            key={e.status}
            onPress={() => handleTabChange(e.value)}>
            <Text
              style={[
                styles.txtTab,
                status === e.value && styles.txtTabActive,
              ]}>
              {e.status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.itemWrapper}>
          <Text style={styles.title}>Location</Text>
          <ChipsInput
            ref={customTag}
            tags={formData.locations}
            placeholder="Add more"
            onCreateTag={handleLocation}
            inputStyle={{color: COLORS.accent}}
            tagStyle={{backgroundColor: COLORS.accent}}
          />
        </View>

        <View style={styles.itemWrapper}>
          <Text style={styles.title}>Property type</Text>
          <FlatList
            data={propTypesData}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            extraData={selectedPropType}
            renderItem={renderItem}
          />
        </View>

        <View style={styles.itemWrapper}>
          <Text style={styles.title}>Budget</Text>
          {status === 'Sale' ? (
            <View style={styles.rangesWrapper}>
              <Text style={styles.text}>&#8377; {buyRange[0]} </Text>
              <Text style={styles.text}>&#8377; {buyRange[1]} </Text>
            </View>
          ) : (
            <View style={styles.rangesWrapper}>
              <Text style={styles.text}>&#8377; {rentRange[0]} </Text>
              <Text style={styles.text}>&#8377; {rentRange[1]} </Text>
            </View>
          )}
          <View style={customStyles.flexCenter}>
            {status === 'Sale' ? (
              <MultiSlider
                values={[buyRange[0], buyRange[1]]}
                sliderLength={WIDTH / 1.2}
                onValuesChange={handleBuyRange}
                selectedStyle={{backgroundColor: COLORS.accent}}
                unselectedStyle={{backgroundColor: COLORS.warning}}
                min={50000}
                max={1000000}
                step={10000}
                allowOverlap
                snapped
              />
            ) : (
              <MultiSlider
                values={[rentRange[0], rentRange[1]]}
                sliderLength={WIDTH / 1.2}
                onValuesChange={handleRentRange}
                selectedStyle={{backgroundColor: COLORS.accent}}
                unselectedStyle={{backgroundColor: COLORS.warning}}
                min={1000}
                max={100000}
                step={500}
                allowOverlap
                snapped
              />
            )}
          </View>
        </View>

        <View style={styles.itemWrapper}>
          <Text style={styles.title}>No of bedrooms</Text>
          <FlatList
            data={noOfBedrooms}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            extraData={selectedNoOfBedrooms}
            renderItem={renderBedrooms}
          />
        </View>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.6}
          onPress={handleSubmit}>
          <FontAwesome name="search" size={16} color={COLORS.white} />
          <Text style={styles.txtBtn}>Search</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FiltersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listTab: {
    flexDirection: 'row',
    elevation: 10,
    backgroundColor: COLORS.white,
  },
  btnTab: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 0.4,
    borderLeftColor: COLORS.accent,
  },
  txtTab: {
    fontSize: 16,
    color: COLORS.darkGrey,
  },
  btnTabActive: {
    borderBottomColor: COLORS.accent,
    borderBottomWidth: 0.8,
  },
  txtTabActive: {
    color: COLORS.accent,
  },
  itemWrapper: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    // backgroundColor: 'grey',
  },
  title: {
    fontWeight: '700',
  },
  propType: {
    marginRight: 10,
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 3,
  },
  rangesWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: WIDTH / 7,
  },
  btn: {
    backgroundColor: COLORS.accent,
    marginHorizontal: 10,
    marginVertical: 20,
    paddingVertical: 10,
    borderRadius: 3,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  txtBtn: {color: COLORS.white, fontWeight: '700', marginLeft: 10},
});
