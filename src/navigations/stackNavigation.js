import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GeneralHeader from './headers/generalHeader';
import HeaderLeft from './headers/headerLeft';
import Home from '../views/screens/HomeScreen';
import OnBoardScreen from '../views/screens/OnBoardScreen';
import DetailsScreen from '../views/screens/DetailsScreen';
import BuyHome from '../views/screens/BuyHome';
import PostProperty from '../views/screens/seller/PostProperty';
import {StyleSheet, Text, View} from 'react-native';

const Stack = createStackNavigator();

const AllStacks = () => {
  return (
    <Stack.Navigator initialRouteNam="OnBoardScreen">
      <Stack.Screen
        name="OnBoardScreen"
        component={OnBoardScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BuyHome"
        component={BuyHome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SelerScreen"
        component={PostProperty}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AllStacks;
