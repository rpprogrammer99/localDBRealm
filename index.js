/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AppProvider from './src/Components/LocalStorage/AppProvider';

const AppContainer = props => (
  <AppProvider>
    <App />
  </AppProvider>
);
AppRegistry.registerComponent(appName, () => AppContainer);
