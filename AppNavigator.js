// Global Imports
import * as React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screen Imports
import TaskScreen from './src/Screens/Tasks';
import UserScreen from './src/Screens/Users';
import HomeScreen from './src/Screens/Home';

const Stack = createNativeStackNavigator();

const back = require('./src/Assets/arrow.png');

const AppNavigator = () => {
  const renderImage = navigation => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={back}
          style={{
            width: 20,
            height: 20,
            marginLeft: 10,
            marginRight: 10,
            transform: [{rotate: '180deg'}],
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Tasks"
          component={TaskScreen}
          options={({navigation}) => ({
            headerLeft: () => renderImage(navigation),
          })}
        />
        <Stack.Screen
          name="Users"
          component={UserScreen}
          options={({navigation}) => ({
            headerLeft: () => renderImage(navigation),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
