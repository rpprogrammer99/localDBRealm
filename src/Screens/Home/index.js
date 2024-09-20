// Global Imports
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

// File Imports
import styles from './styles';

const HomeScreen = ({navigation}) => {
  const onPressNavigation = screen => {
    navigation.navigate(screen);
  };

  const renderMainView = () => {
    return <View style={styles.container}>{renderNavigation()}</View>;
  };

  const renderNavigation = () => {
    return (
      <>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => onPressNavigation('Tasks')}>
          <Text style={styles.title}>Tasks</Text>
          <Image
            source={require('../../Assets/arrow.png')}
            style={styles.imgArrow}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => onPressNavigation('Users')}>
          <Text style={styles.title}>Users</Text>
          <Image
            source={require('../../Assets/arrow.png')}
            style={styles.imgArrow}
          />
        </TouchableOpacity>
      </>
    );
  };

  return renderMainView();
};

export default HomeScreen;
