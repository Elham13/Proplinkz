import {Dimensions, StyleSheet} from 'react-native';
import COLORS from './colors';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

export const localApi = 'http://192.168.0.200:5000';

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
    marginHorizontal: 2,
  },
});
