import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  RadioButton,
  RadioGroup,
  Incubator,
  KeyboardAwareScrollView,
  Toast,
} from 'react-native-ui-lib';
import axios from 'axios';
import {Picker} from '@react-native-community/picker';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import COLORS from '../../../consts/colors';
import {customStyles, localApi, proptypes, WIDTH} from '../../../consts/utils';
import {addPropertyAction} from '../../../redux/actions/propertyActions';

const {TextField} = Incubator;

const PostProperty = ({navigation}) => {
  const dispatch = useDispatch();
  const property = useSelector(state => state.createProperty);

  navigator.geolocation = require('react-native-geolocation-service');

  const scrollView = useRef();

  const [date, setDate] = useState(new Date());
  const [popup, setPopup] = useState({
    open: false,
    color: '',
    message: '',
    position: 'top',
  });
  const [formData, setFormData] = useState({
    identity: '',
    purpose: '',
    available: 'Immediately',
    bedrooms: 0,
    balconies: 0,
    floorNo: 0,
    totalFloors: 0,
    bathrooms: 0,
    kitchens: 0,
    area: '',
    propType: 'selected',
    furnished: 'selected',
    location: '',
    rentDetails: {
      rent: '',
      securityDeposit: '',
      maintenance: '',
    },
    saleDetaails: {
      expectedPrice: '',
      pricePerSqFt: '',
    },
    photos: [],
  });

  const closePopup = () => {
    setPopup({
      open: false,
      color: '',
      message: '',
      position: 'top',
    });
  };

  const handleInputChange = key => {
    return value => {
      setFormData({
        ...formData,
        [key]: value,
      });
    };
  };

  const handleDateChange = txt => {
    setDate(txt);
    setFormData({...formData, available: date});
  };

  const isReadyToSubmit = () => {
    const {identity, purpose, propType} = formData;

    if (identity && purpose && propType !== 'selected') {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = () => {
    if (!isReadyToSubmit()) {
      setPopup({
        open: true,
        color: COLORS.warning,
        message: 'Make sure you provided the required data',
        position: 'top',
      });
      return;
    }
    dispatch(addPropertyAction(formData));
  };

  const launchImageLibrary = async () => {
    if (formData.photos.length > 5) {
      setPopup({
        open: true,
        color: COLORS.warning,
        message: 'You can upload up to 6 images',
        position: 'top',
      });
    } else {
      ImagePicker.openPicker({
        width: 5300,
        height: 3400,
        cropping: true,
      })
        .then(image => {
          const fData = new FormData();
          const result = {
            name: 'image',
            type: image.mime,
            uri:
              Platform.OS === 'android'
                ? image.path
                : image.path.replace('file://', ''),
          };
          fData.append('image', result);

          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };

          axios
            .post(`${localApi}/upload/single`, fData, config)
            .then(res => {
              // console.log('Axios res', res.data);
              setFormData({
                ...formData,
                photos: [...formData.photos, res.data],
              });
            })
            .catch(err => console.log('Axios err: ', err));
        })
        .catch(err => console.log('Picker err', err));
    }
  };

  useEffect(() => {
    if (property.err) {
      scrollView.current.scrollTo({x: 0, y: 0, animated: true});
      setPopup({
        open: true,
        color: COLORS.error,
        message: property.err,
        position: 'top',
      });
      return;
    }
    if (property.res) {
      setFormData({
        identity: '',
        purpose: '',
        available: 'Immediately',
        bedrooms: 0,
        balconies: 0,
        floorNo: 0,
        totalFloors: 0,
        bathrooms: 0,
        kitchens: 0,
        area: '',
        propType: 'selected',
        furnished: 'selected',
        location: '',
        rentDetails: {
          rent: '',
          securityDeposit: '',
          maintenance: '',
        },
        saleDetaails: {
          expectedPrice: '',
          pricePerSqFt: '',
        },
        photos: [],
      });
      setPopup({
        open: true,
        color: COLORS.success,
        message: property.res,
        position: 'top',
      });
    }
    return () => {
      setPopup({
        open: false,
        color: '',
        message: '',
        position: 'top',
      });
    };
  }, [property]);

  return (
    <ScrollView ref={scrollView} style={styles.container}>
      <Toast
        visible={popup.open}
        position={popup.position}
        backgroundColor={popup.color}
        message={popup.message}
        onDismiss={closePopup}
        autoDismiss={10000}
        showDismiss={true}
      />
      <Text style={styles.label}>
        Personal details <Text style={styles.required}>*</Text>
      </Text>
      <RadioGroup
        initialValue={formData.identity}
        onValueChange={value => setFormData({...formData, identity: value})}>
        <View style={styles.radioWrapper}>
          <Text>I am: </Text>
          <RadioButton
            style={{width: 16, height: 16, marginLeft: 20}}
            value="Owner"
            label="Owner"
            color={COLORS.accent}
          />
          <RadioButton
            style={{width: 16, height: 16, marginLeft: 20}}
            value="Agent"
            label="Agent"
            color={COLORS.accent}
          />
          <RadioButton
            style={{width: 16, height: 16, marginLeft: 20}}
            value="Builder"
            label="Builder"
            color={COLORS.accent}
          />
        </View>
      </RadioGroup>

      <Text style={[styles.label, {marginTop: 30}]}>
        Property details <Text style={styles.required}>*</Text>
      </Text>
      <RadioGroup
        initialValue={formData.purpose}
        onValueChange={value => setFormData({...formData, purpose: value})}>
        <View style={styles.radioWrapper}>
          <Text>For: </Text>
          <RadioButton
            style={{width: 16, height: 16, marginLeft: 20}}
            value="Sale"
            label="Sale"
            color={COLORS.accent}
          />
          <RadioButton
            style={{width: 16, height: 16, marginLeft: 20}}
            value="Rent"
            label="Rent"
            color={COLORS.accent}
          />
        </View>
      </RadioGroup>
      <View style={customStyles.divider}></View>

      <Text style={[styles.label, {marginTop: 30, marginBottom: 0}]}>
        Property type <Text style={styles.required}>*</Text>
      </Text>
      <Picker
        selectedValue={formData.propType}
        mode="dialog"
        style={{borderBottomWidth: 20, borderBottomColor: '#000'}}
        onValueChange={(itemValue, itemIndex) =>
          setFormData({...formData, propType: itemValue})
        }>
        <Picker.Item label="Property type" value="selected" />
        {proptypes.map((p, ind) => (
          <Picker.Item key={ind} label={p} value={p} />
        ))}
      </Picker>
      <View style={customStyles.divider}></View>

      {formData.propType !== 'selected' && (
        <>
          <Text style={[styles.label, {marginTop: 20}]}>Property features</Text>
          <View style={customStyles.flexRowBetween}>
            <View style={styles.counter}>
              <Text>Bedrooms: </Text>
              <TouchableOpacity
                onPress={() =>
                  setFormData({...formData, bedrooms: formData.bedrooms - 1})
                }
                activeOpacity={0.6}
                style={[
                  styles.counterBtn,
                  {borderTopRightRadius: 0, borderBottomRightRadius: 0},
                ]}>
                <Text style={{color: COLORS.white}}>&#8722;</Text>
              </TouchableOpacity>
              <Text style={styles.counterTxt}>{formData.bedrooms}</Text>
              <TouchableOpacity
                onPress={() =>
                  setFormData({...formData, bedrooms: formData.bedrooms + 1})
                }
                activeOpacity={0.6}
                style={[
                  styles.counterBtn,
                  {borderTopLeftRadius: 0, borderBottomLeftRadius: 0},
                ]}>
                <Text style={{color: COLORS.white}}>&#43;</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.counter}>
              <Text>Balconies: </Text>
              <TouchableOpacity
                onPress={() =>
                  setFormData({...formData, balconies: formData.balconies - 1})
                }
                activeOpacity={0.6}
                style={[
                  styles.counterBtn,
                  {borderTopRightRadius: 0, borderBottomRightRadius: 0},
                ]}>
                <Text style={{color: COLORS.white}}>&#8722;</Text>
              </TouchableOpacity>
              <Text style={styles.counterTxt}>{formData.balconies}</Text>
              <TouchableOpacity
                onPress={() =>
                  setFormData({...formData, balconies: formData.balconies + 1})
                }
                activeOpacity={0.6}
                style={[
                  styles.counterBtn,
                  {borderTopLeftRadius: 0, borderBottomLeftRadius: 0},
                ]}>
                <Text style={{color: COLORS.white}}>&#43;</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.counter}>
              <Text>Floor No: </Text>
              <TouchableOpacity
                onPress={() =>
                  setFormData({...formData, floorNo: formData.floorNo - 1})
                }
                activeOpacity={0.6}
                style={[
                  styles.counterBtn,
                  {borderTopRightRadius: 0, borderBottomRightRadius: 0},
                ]}>
                <Text style={{color: COLORS.white}}>&#8722;</Text>
              </TouchableOpacity>
              <Text style={styles.counterTxt}>{formData.floorNo}</Text>
              <TouchableOpacity
                onPress={() =>
                  setFormData({...formData, floorNo: formData.floorNo + 1})
                }
                activeOpacity={0.6}
                style={[
                  styles.counterBtn,
                  {borderTopLeftRadius: 0, borderBottomLeftRadius: 0},
                ]}>
                <Text style={{color: COLORS.white}}>&#43;</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.counter}>
              <Text>Total Floors: </Text>
              <TouchableOpacity
                onPress={() =>
                  setFormData({
                    ...formData,
                    totalFloors: formData.totalFloors - 1,
                  })
                }
                activeOpacity={0.6}
                style={[
                  styles.counterBtn,
                  {borderTopRightRadius: 0, borderBottomRightRadius: 0},
                ]}>
                <Text style={{color: COLORS.white}}>&#8722;</Text>
              </TouchableOpacity>
              <Text style={styles.counterTxt}>{formData.totalFloors}</Text>
              <TouchableOpacity
                onPress={() =>
                  setFormData({
                    ...formData,
                    totalFloors: formData.totalFloors + 1,
                  })
                }
                activeOpacity={0.6}
                style={[
                  styles.counterBtn,
                  {borderTopLeftRadius: 0, borderBottomLeftRadius: 0},
                ]}>
                <Text style={{color: COLORS.white}}>&#43;</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.counter}>
              <Text>Bathrooms: </Text>
              <TouchableOpacity
                onPress={() =>
                  setFormData({...formData, bathrooms: formData.bathrooms - 1})
                }
                activeOpacity={0.6}
                style={[
                  styles.counterBtn,
                  {borderTopRightRadius: 0, borderBottomRightRadius: 0},
                ]}>
                <Text style={{color: COLORS.white}}>&#8722;</Text>
              </TouchableOpacity>
              <Text style={styles.counterTxt}>{formData.bathrooms}</Text>
              <TouchableOpacity
                onPress={() =>
                  setFormData({...formData, bathrooms: formData.bathrooms + 1})
                }
                activeOpacity={0.6}
                style={[
                  styles.counterBtn,
                  {borderTopLeftRadius: 0, borderBottomLeftRadius: 0},
                ]}>
                <Text style={{color: COLORS.white}}>&#43;</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.counter}>
              <Text>Kitchens: </Text>
              <TouchableOpacity
                onPress={() =>
                  setFormData({...formData, kitchens: formData.kitchens - 1})
                }
                activeOpacity={0.6}
                style={[
                  styles.counterBtn,
                  {borderTopRightRadius: 0, borderBottomRightRadius: 0},
                ]}>
                <Text style={{color: COLORS.white}}>&#8722;</Text>
              </TouchableOpacity>
              <Text style={styles.counterTxt}>{formData.kitchens}</Text>
              <TouchableOpacity
                onPress={() =>
                  setFormData({...formData, kitchens: formData.kitchens + 1})
                }
                activeOpacity={0.6}
                style={[
                  styles.counterBtn,
                  {borderTopLeftRadius: 0, borderBottomLeftRadius: 0},
                ]}>
                <Text style={{color: COLORS.white}}>&#43;</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TextField
            floatingPlaceholder
            floatingPlaceholderColor={{
              default: COLORS.grey,
              focus: COLORS.accent,
            }}
            floatOnFocus
            fieldStyle={styles.withUnderline}
            placeholder="Area in sqft"
            keyboardType="number-pad"
            value={formData.area}
            onChangeText={handleInputChange('area')}
          />
          {formData.purpose === 'Rent' ? (
            <>
              <TextField
                floatingPlaceholder
                floatingPlaceholderColor={{
                  default: COLORS.grey,
                  focus: COLORS.accent,
                }}
                floatOnFocus
                fieldStyle={styles.withUnderline}
                placeholder="Monthly Rent"
                keyboardType="number-pad"
                value={formData.rentDetails.rent}
                onChangeText={txt =>
                  setFormData({
                    ...formData,
                    rentDetails: Object.assign(formData.rentDetails, {
                      rent: txt,
                    }),
                  })
                }
              />
              <TextField
                floatingPlaceholder
                floatingPlaceholderColor={{
                  default: COLORS.grey,
                  focus: COLORS.accent,
                }}
                floatOnFocus
                fieldStyle={styles.withUnderline}
                placeholder="Security Deposit"
                keyboardType="number-pad"
                value={formData.rentDetails.securityDeposit}
                onChangeText={txt =>
                  setFormData({
                    ...formData,
                    rentDetails: Object.assign(formData.rentDetails, {
                      securityDeposit: txt,
                    }),
                  })
                }
              />
              <TextField
                floatingPlaceholder
                floatingPlaceholderColor={{
                  default: COLORS.grey,
                  focus: COLORS.accent,
                }}
                floatOnFocus
                fieldStyle={[styles.withUnderline, {marginBottom: 20}]}
                placeholder="Maintenance"
                keyboardType="number-pad"
                value={formData.rentDetails.maintenance}
                onChangeText={txt =>
                  setFormData({
                    ...formData,
                    rentDetails: Object.assign(formData.rentDetails, {
                      maintenance: txt,
                    }),
                  })
                }
              />
            </>
          ) : (
            <>
              <TextField
                floatingPlaceholder
                floatingPlaceholderColor={{
                  default: COLORS.grey,
                  focus: COLORS.accent,
                }}
                floatOnFocus
                fieldStyle={styles.withUnderline}
                placeholder="Expected Price"
                keyboardType="number-pad"
                value={formData.saleDetaails.expectedPrice}
                onChangeText={txt =>
                  setFormData({
                    ...formData,
                    saleDetaails: Object.assign(formData.saleDetaails, {
                      expectedPrice: txt,
                    }),
                  })
                }
              />
              <TextField
                floatingPlaceholder
                floatingPlaceholderColor={{
                  default: COLORS.grey,
                  focus: COLORS.accent,
                }}
                floatOnFocus
                fieldStyle={[styles.withUnderline, {marginBottom: 20}]}
                placeholder="Price per sqft"
                keyboardType="number-pad"
                value={formData.saleDetaails.pricePerSqFt}
                onChangeText={txt =>
                  setFormData({
                    ...formData,
                    saleDetaails: Object.assign(formData.saleDetaails, {
                      pricePerSqFt: txt,
                    }),
                  })
                }
              />
            </>
          )}

          <RadioGroup
            initialValue="Immediately"
            onValueChange={value =>
              setFormData({...formData, available: value})
            }>
            <View style={styles.radioWrapper}>
              <Text>Available from: </Text>

              <RadioButton
                style={{width: 16, height: 16, marginLeft: 20}}
                value="Immediately"
                label="Immediately"
                color={COLORS.accent}
              />
              <RadioButton
                style={{width: 16, height: 16, marginLeft: 20}}
                value="Date"
                label="Select Date"
                color={COLORS.accent}
              />
            </View>
          </RadioGroup>

          {formData.available !== 'Immediately' && (
            <DatePicker
              textColor={COLORS.accent}
              style={{width: WIDTH}}
              mode="date"
              date={date}
              onDateChange={handleDateChange}
              androidVariant="nativeAndroid"
            />
          )}
          <View style={customStyles.divider}></View>

          <Picker
            selectedValue={formData.furnished}
            mode="dialog"
            onValueChange={(itemValue, itemIndex) =>
              setFormData({...formData, furnished: itemValue})
            }>
            <Picker.Item label="Furnished Status" value="selected" />
            <Picker.Item label="Fully Furnished" value="Fully Furnished" />
            <Picker.Item label="Semi Furnished" value="Semi Furnished" />
            <Picker.Item label="Not Furnished" value="Not Furnished" />
          </Picker>

          <View style={customStyles.divider}></View>
        </>
      )}

      <TextField
        floatingPlaceholder
        floatingPlaceholderColor={{
          default: COLORS.grey,
          focus: COLORS.accent,
        }}
        floatOnFocus
        fieldStyle={styles.withUnderline}
        placeholder="Property Location"
        value={formData.location}
        onChangeText={handleInputChange('location')}
      />

      {/* <Text style={[styles.label, {marginTop: 30, marginBottom: 0}]}>
        Select property location
      </Text>
      <GooglePlacesAutocomplete
        currentLocation={true}
        enableHighAccuracyLocation={true}
        placeholder="Search"
        onValueChange={val => console.log(val)}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log('Data: ', data, details);
        }}
        query={{
          key: 'AIzaSyCm3epk5nBM6X_SIxK3yT5um9UGDpkNC5I',
          language: 'en',
        }}
      /> */}

      <View style={styles.imgWrapper}>
        {formData.photos.length > 0 && (
          <>
            {formData.photos.map(photo => (
              <Image key={photo} source={{uri: photo}} style={styles.img} />
            ))}
          </>
        )}
      </View>

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={launchImageLibrary}
        style={styles.photoBtn}>
        <Text style={customStyles.normalTxt}>Select image</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.submit}
        onPress={handleSubmit}>
        {property.loading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={{color: COLORS.white}}>Post</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PostProperty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  label: {
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  radioWrapper: {marginBottom: 5, flexDirection: 'row'},
  withUnderline: {
    borderBottomWidth: 1,
    borderColor: COLORS.accent,
    paddingBottom: 4,
  },
  counter: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  counterBtn: {
    backgroundColor: COLORS.accent,
    width: WIDTH / 12,
    alignItems: 'center',
    borderWidth: 0.6,
    borderColor: COLORS.accent,
    borderRadius: 2,
  },
  counterTxt: {
    borderBottomColor: COLORS.accent,
    borderBottomWidth: 0.6,
    borderTopColor: COLORS.accent,
    borderTopWidth: 0.6,
    paddingHorizontal: 10,
  },
  submit: {
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 4,
    marginBottom: 30,
  },
  photoBtn: {
    borderColor: COLORS.accent,
    padding: 4,
    alignItems: 'center',
    borderWidth: 1,
    marginVertical: 10,
    width: WIDTH / 4,
    borderRadius: 3,
  },
  imgWrapper: {
    marginVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  img: {
    width: WIDTH / 4 - 14,
    height: WIDTH / 4 - 14,
    marginRight: 4,
    marginTop: 4,
  },
  required: {
    color: COLORS.error,
  },
});
