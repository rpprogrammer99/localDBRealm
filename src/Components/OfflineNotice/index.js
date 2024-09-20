// Global Imports
import React from 'react';
import {SafeAreaView, Text} from 'react-native';

// File Imports
import styles from './styles';

const OfflineNotice = () => {
  return (
    <SafeAreaView style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </SafeAreaView>
  );
};

export default OfflineNotice;
