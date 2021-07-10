import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import COLORS from '../../consts/colors';

const ListCtegories = () => {
  const categoryList = ['Popular', 'Recommended', 'Nearest'];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  return (
    <View style={style.categoryListContainer}>
      {categoryList.map((category, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setSelectedCategoryIndex(index)}>
          <Text
            style={[
              style.categoryListText,
              index == selectedCategoryIndex && style.activeCategoryListText,
            ]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ListCtegories;

const style = StyleSheet.create({
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingHorizontal: 40,
  },
  categoryListText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: COLORS.grey,
  },
  activeCategoryListText: {
    color: COLORS.accent,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accent,
    paddingBottom: 5,
  },
});
