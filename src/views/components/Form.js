import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
  Modal,
} from 'react-native';
import {Incubator} from 'react-native-ui-lib';
import {Picker} from '@react-native-community/picker';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch} from 'react-redux';
import COLORS from '../../consts/colors';
import {customStyles, localApi, WIDTH} from '../../consts/utils';
import {addPropertyAction} from '../../redux/actions/propertyActions';

const {TextField} = Incubator;

const SellerScreen = () => {
  const dispatch = useDispatch();
  const [popup, setPopup] = useState({
    open: false,
    message: '',
  });
  const [formData, setFormData] = useState({
    type: 'selected',
    purpose: 'selected',
    subType: 'selected',
    furnished: 'selected',
    facing: 'selected',
    title: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    kitchens: '',
    area: '',
    noOfFloors: '',
    whichFloor: '',
    details: '',
    photos: [],
  });

  const launchImageLibrary = async () => {
    if (formData.photos.length > 3) {
      setPopup({
        open: true,
        message: 'You can upload up to 4 images',
      });
    } else {
      ImagePicker.openPicker({
        width: 400,
        height: 400,
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

  const handleSubmit = () => {
    const {
      purpose,
      subType,
      furnished,
      title,
      location,
      price,
      bedrooms,
      bathrooms,
      kitchens,
      photos,
    } = formData;

    if (
      purpose === 'selected' ||
      subType === 'selected' ||
      furnished === 'selected' ||
      !title ||
      !location ||
      !price ||
      !bedrooms ||
      !bathrooms ||
      !kitchens ||
      !photos.length
    ) {
      setPopup({
        open: true,
        message:
          '"Subtype, Purpose, Furnished, Title, Locatione, Price, Bedrooms, Bathrooms, Kitchen and Photos", cannot be empty',
      });
      return;
    }

    // Request
    dispatch(addPropertyAction(formData));
  };

  const closePopup = () => {
    setPopup({
      open: false,
      message: '',
    });
  };

  useEffect(() => {
    // console.log('FormData: ', formData);
  }, [formData]);

  return (
    <View behavior="height" style={styles.container}>
      <Text style={styles.title}>Post your Property</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formWrapper}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={popup.open}
            onRequestClose={closePopup}>
            <View style={customStyles.centeredView}>
              <View style={customStyles.modalView}>
                <Text style={customStyles.modalText}>{popup.message}</Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={customStyles.modalBtn}
                  onPress={closePopup}>
                  <Text style={customStyles.modalBtnTxt}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Picker
            selectedValue={formData.type}
            mode="dialog"
            onValueChange={(itemValue, itemIndex) =>
              setFormData({...formData, type: itemValue})
            }>
            <Picker.Item label="Property type" value="selected" />
            <Picker.Item label="Apartement" value="Apartement" />
            <Picker.Item label="Villa" value="Villa" />
            <Picker.Item label="Flat" value="Flat" />
          </Picker>
          <View style={styles.separatore}></View>

          <Picker
            selectedValue={formData.subType}
            mode="dialog"
            onValueChange={(itemValue, itemIndex) =>
              setFormData({...formData, subType: itemValue})
            }>
            <Picker.Item label="Property Subtype" value="selected" />
            <Picker.Item label="BHK" value="BHK" />
            <Picker.Item label="RK" value="RK" />
          </Picker>
          <View style={styles.separatore}></View>

          <Picker
            selectedValue={formData.purpose}
            mode="dialog"
            onValueChange={(itemValue, itemIndex) =>
              setFormData({...formData, purpose: itemValue})
            }>
            <Picker.Item label="Purpose" value="selected" />
            <Picker.Item label="For Rent" value="For Rent" />
            <Picker.Item label="For Sale" value="For Sale" />
            <Picker.Item label="For Lease" value="For Lease" />
          </Picker>
          <View style={styles.separatore}></View>

          <Picker
            selectedValue={formData.furnished}
            mode="dialog"
            onValueChange={(itemValue, itemIndex) =>
              setFormData({...formData, furnished: itemValue})
            }>
            <Picker.Item label="Furnished" value="selected" />
            <Picker.Item label="Fully furnished" value="Fully furnished" />
            <Picker.Item label="Semi furnished" value="Semi furnished" />
          </Picker>
          <View style={styles.separatore}></View>

          <Picker
            selectedValue={formData.facing}
            mode="dialog"
            onValueChange={(itemValue, itemIndex) =>
              setFormData({...formData, facing: itemValue})
            }>
            <Picker.Item label="Facing" value="selected" />
            <Picker.Item label="East" value="East" />
            <Picker.Item label="West" value="West" />
            <Picker.Item label="North" value="North" />
            <Picker.Item label="South" value="South" />
          </Picker>
          <View style={styles.separatore}></View>

          <TextField
            floatingPlaceholder
            floatingPlaceholderColor={{
              default: COLORS.grey,
              focus: COLORS.accent,
            }}
            floatOnFocus
            fieldStyle={styles.withUnderline}
            placeholder="Enter Property Title"
            value={formData.title}
            onChangeText={text => setFormData({...formData, title: text})}
          />
          <TextField
            textContentTyp="location"
            floatingPlaceholder
            floatingPlaceholderColor={{
              default: COLORS.grey,
              focus: COLORS.accent,
            }}
            floatOnFocus
            fieldStyle={styles.withUnderline}
            placeholder="Enter location"
            value={formData.location}
            onChangeText={text => setFormData({...formData, location: text})}
          />
          <TextField
            floatingPlaceholder
            floatingPlaceholderColor={{
              default: COLORS.grey,
              focus: COLORS.accent,
            }}
            floatOnFocus
            fieldStyle={styles.withUnderline}
            placeholder="Enter your Price"
            keyboardType="number-pad"
            value={formData.price}
            onChangeText={text => setFormData({...formData, price: text})}
          />
          <TextField
            floatingPlaceholder
            floatingPlaceholderColor={{
              default: COLORS.grey,
              focus: COLORS.accent,
            }}
            floatOnFocus
            fieldStyle={styles.withUnderline}
            placeholder="Area in square feet"
            keyboardType="number-pad"
            value={formData.area}
            onChangeText={text => setFormData({...formData, area: text})}
          />
          <TextField
            floatingPlaceholder
            floatingPlaceholderColor={{
              default: COLORS.grey,
              focus: COLORS.accent,
            }}
            floatOnFocus
            fieldStyle={styles.withUnderline}
            keyboardType="number-pad"
            placeholder="No of Bedrooms"
            value={formData.bedrooms}
            onChangeText={text => setFormData({...formData, bedrooms: text})}
          />
          <TextField
            floatingPlaceholder
            floatingPlaceholderColor={{
              default: COLORS.grey,
              focus: COLORS.accent,
            }}
            floatOnFocus
            fieldStyle={styles.withUnderline}
            keyboardType="number-pad"
            placeholder="No of Bathrooms"
            value={formData.bathrooms}
            onChangeText={text => setFormData({...formData, bathrooms: text})}
          />
          <TextField
            floatingPlaceholder
            floatingPlaceholderColor={{
              default: COLORS.grey,
              focus: COLORS.accent,
            }}
            floatOnFocus
            fieldStyle={styles.withUnderline}
            keyboardType="number-pad"
            placeholder="No of Kitchens"
            value={formData.kitchens}
            onChangeText={text => setFormData({...formData, kitchens: text})}
          />
          <TextField
            floatingPlaceholder
            floatingPlaceholderColor={{
              default: COLORS.grey,
              focus: COLORS.accent,
            }}
            floatOnFocus
            fieldStyle={styles.withUnderline}
            keyboardType="number-pad"
            placeholder="No of Floors"
            value={formData.noOfFloors}
            onChangeText={text => setFormData({...formData, noOfFloors: text})}
          />
          <TextField
            floatingPlaceholder
            floatingPlaceholderColor={{
              default: COLORS.grey,
              focus: COLORS.accent,
            }}
            floatOnFocus
            fieldStyle={styles.withUnderline}
            keyboardType="number-pad"
            placeholder="Which floor"
            value={formData.whichFloor}
            onChangeText={text => setFormData({...formData, whichFloor: text})}
          />
          <TextField
            floatingPlaceholder
            floatingPlaceholderColor={{
              default: COLORS.grey,
              focus: COLORS.accent,
            }}
            floatOnFocus
            fieldStyle={styles.withUnderline}
            placeholder="Details"
            value={formData.details}
            onChangeText={text => setFormData({...formData, details: text})}
          />
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
            style={styles.btn}>
            <Text style={customStyles.normalTxt}>Chose image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={handleSubmit}
            style={customStyles.btnContain}>
            <Text style={[customStyles.normalTxt, {color: COLORS.white}]}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SellerScreen;

const styles = StyleSheet.create({
  container: {},
  title: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18,
    fontWeight: '700',
  },
  formWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  withUnderline: {
    borderBottomWidth: 1,
    borderColor: COLORS.accent,
    paddingBottom: 4,
  },
  separatore: {
    backgroundColor: COLORS.accent,
    width: '100%',
    height: 1,
  },
  btn: {
    borderColor: COLORS.accent,
    padding: 4,
    alignItems: 'center',
    borderWidth: 1,
    marginVertical: 10,
    width: 100,
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
  },
});
