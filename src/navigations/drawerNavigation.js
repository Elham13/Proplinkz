import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AllStacks from './stackNavigation';
import DrawerContent from './drawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      initialRouteName="Home">
      <Drawer.Screen name="Home" component={AllStacks} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
