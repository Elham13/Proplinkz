import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Incubator} from 'react-native-ui-lib';
import {Picker} from '@react-native-community/picker';
import COLORS from '../../consts/colors';
import {numbers} from '../../consts/utils';

const {TextField} = Incubator;

export const ShowOwnerDetails = ({formData, onChange}) => {
  return (
    <View>
      <TextField
        floatingPlaceholder
        floatingPlaceholderColor={{
          default: COLORS.grey,
          focus: COLORS.accent,
        }}
        floatOnFocus
        fieldStyle={styles.withUnderline}
        placeholder="Enter your name"
        value={formData.name}
        onChangeText={onChange('name')}
      />
      <TextField
        floatingPlaceholder
        floatingPlaceholderColor={{
          default: COLORS.grey,
          focus: COLORS.accent,
        }}
        floatOnFocus
        fieldStyle={styles.withUnderline}
        placeholder="Enter your Mobile number"
        keyboardType="number-pad"
        value={formData.mobileNo}
        onChangeText={onChange('mobileNo')}
      />
      <TextField
        floatingPlaceholder
        floatingPlaceholderColor={{
          default: COLORS.grey,
          focus: COLORS.accent,
        }}
        floatOnFocus
        fieldStyle={styles.withUnderline}
        placeholder="Enter your email"
        value={formData.email}
        onChangeText={onChange('email')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  withUnderline: {
    borderBottomWidth: 1,
    borderColor: COLORS.accent,
    paddingBottom: 4,
  },
});
