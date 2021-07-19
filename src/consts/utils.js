import {Dimensions, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from './colors';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

export const localApi = 'http://10.124.235.238:5001';

export const proptypes = [
  'Flat/Apartment',
  'Residential House',
  'Villa',
  'Builder Floor Apartment',
  'Residential Land/Plot',
  'Penthouse',
  'Studio Apartment',
  'Commercial Office Space',
  'Commercial Shop',
  'Commercial Showroom',
  'Commercial Land',
  'Warehouse/Godown',
  'Industrial Land',
  'Industrial Building',
  'Agricultural Land',
  'Farm House',
];
export const numbers = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
];

export const customStyles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.light,
    height: HEIGHT,
  },
  normalTxt: {
    fontSize: 12,
  },
  boldTxt: {
    fontWeight: 'bold',
  },
  lightSmTxt: {
    fontWeight: '100',
    fontSize: 10,
    color: COLORS.grey,
  },
  lightTxt: {
    fontSize: 11,
    color: COLORS.darkGrey,
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnOutline: {
    borderColor: COLORS.black,
    borderWidth: 0.8,
    borderRadius: 2,
    paddingHorizontal: 20,
    paddingVertical: 4,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  btnContain: {
    backgroundColor: COLORS.accent,
    borderRadius: 2,
    borderColor: COLORS.accent,
    borderWidth: 0.8,
    paddingHorizontal: 20,
    paddingVertical: 4,
    flex: 1,
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalView: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: COLORS.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBtn: {
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    elevation: 2,
    marginLeft: 'auto',
    backgroundColor: COLORS.accent,
  },
  modalBtnTxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.accent,
  },
});

export const removeByAttr = (arr, attr, value) => {
  let i = arr.length;
  while (i--) {
    if (arr[i] && arr[i].hasOwnProperty(attr) && arr[i][attr] === value) {
      arr.splice(i, 1);
    }
  }
  return arr;
};
