import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from "@react-native-firebase/messaging"

const saveItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

const fetchItem = key => {
  return new Promise((result, error) => {
    AsyncStorage.getItem(key)
      .then(res => result(JSON.parse(res)))
      .catch(err => error(err));
  });
};

export const clearLocalStorage = () => {
  AsyncStorage.clear();
};

// Login values
export const setIsLogin = value => saveItem('IS_LOGIN', value);
export const getIsLogin = () => fetchItem('IS_LOGIN');

// App Open First Time
export const saveIsFirstTime = value => saveItem('IS_FIRST_TIME', value);
export const getIsFirstTime = () => fetchItem('IS_FIRST_TIME');

// user data
export const saveUser = value => saveItem('USER', value);
export const fetchUser = () => fetchItem('USER');

// JWT TOKEN
export const saveApiToken = value => saveItem('JWT_TOKEN', value);
export const getApiToken = () => fetchItem('JWT_TOKEN');

//     return new Promise((result, error) => {
//         getFCMToken().then((res, error) => {
//             if (!!res) {
//                 result(res)
//             }
//             else {
//                 messaging().getToken()
//                     .then(res => {
//                         setFCMToken(res)
//                         result(res)
//                     })
//                     .catch(err => {
//                         error(err)
//                     })
//             }
//         })
//     });
// };
