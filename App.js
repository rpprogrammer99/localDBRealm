// App.js

import React from 'react';
import 'react-native-gesture-handler';
import {RealmProvider} from '@realm/react';
import {TaskSchema, userSchema} from './src/Realm/Schemas';
import AppNavigator from './AppNavigator';

const App = () => {
  return (
    <RealmProvider schema={[TaskSchema, userSchema]}>
      <AppNavigator />
    </RealmProvider>
  );
};

export default App;
