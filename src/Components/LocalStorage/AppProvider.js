// Global Imports
import React, {useEffect, useMemo, useState} from 'react';
import {
  getIsLogin,
  setIsLogin,
  saveUser,
  fetchUser,
  saveApiToken,
  getApiToken,
  getIsFirstTime,
  saveIsFirstTime,
} from '../LocalStorage/LocalStorage';
import NetInfo from '@react-native-community/netinfo';

// Local Imports
import OfflineNotice from '../OfflineNotice';
import {AppContext} from './AppContext';

const AppProvider = props => {
  const [isFetchingLocalData, setIsFetchingLocalData] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [user, setUser] = useState(undefined);
  const [jwtToken, setJwtToken] = useState(undefined);
  const [selectedTab, setSelectedTab] = useState('front');

  useEffect(() => {
    getLocalValues();
  }, []);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      if (state.isInternetReachable != null)
        setIsConnected(state.isConnected && state.isInternetReachable);
      else setIsConnected(state.isConnected);
    });
  }, []);

  const getLocalValues = async () => {
    let isCheckLogin = await getIsLogin();
    if (isCheckLogin) {
      setIsLoggedIn(isCheckLogin);
    }

    let isFirstTime = await getIsFirstTime();
    if (isFirstTime) {
      setIsFirstTime(isFirstTime);
    }

    let userData = await fetchUser();
    if (userData) {
      setUser(userData);
    }

    let jwtToken = await getApiToken();
    if (jwtToken) {
      setJwtToken(jwtToken);
    }

    setIsFetchingLocalData(false);
  };

  const updateIsLoggedIn = value => {
    setIsLogin(value);
    setIsLoggedIn(value);
  };

  const updateIsFirstTime = value => {
    setIsFirstTime(value);
    saveIsFirstTime(value);
  };

  const updateUser = value => {
    setUser(value);
    saveUser(value);
  };

  const updateJwtToken = value => {
    setJwtToken(value);
    saveApiToken(value);
  };

  const updateSelectedTab = (value = 'front') => {
    setSelectedTab(value);
  };

  const updateConnectionValues = value => {
    setIsConnected(value);
  };

  const providerValue = useMemo(
    () => ({
      isLoggedIn,
      updateIsLoggedIn,
      isLoading,
      setIsLoading,
      isFirstTime,
      updateIsFirstTime,
      user,
      updateUser,
      jwtToken,
      updateJwtToken,
      selectedTab,
      setSelectedTab,
      updateSelectedTab,
      isConnected,
      setIsConnected,
    }),
    [
      isLoggedIn,
      updateIsLoggedIn,
      isLoading,
      setIsLoading,
      isFirstTime,
      updateIsFirstTime,
      user,
      updateUser,
      jwtToken,
      updateJwtToken,
      selectedTab,
      setSelectedTab,
      updateSelectedTab,
      isConnected,
    ],
  );

  return (
    <AppContext.Provider value={providerValue}>
      {!isFetchingLocalData && props.children}
      {!isConnected && <OfflineNotice />}
    </AppContext.Provider>
  );
};

export default AppProvider;
