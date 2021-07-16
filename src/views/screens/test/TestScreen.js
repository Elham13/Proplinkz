import React, {Component} from 'react';
import {
  Assets,
  TabController,
  Colors,
  View,
  Text,
  Button,
  TabControllerItemProps,
} from 'react-native-ui-lib';

const TestScreen = () => {
  const onChangeIndex = () => {};
  return (
    <View>
      <TabController
        // key={key}
        asCarousel={true}
        selectedIndex={0}
        onChangeIndex={onChangeIndex}
        items={[]}></TabController>
      <TabController.TabPage />
    </View>
  );
};

export default TestScreen;
