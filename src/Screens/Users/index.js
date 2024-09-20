// UserList.js

import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {useRealm, useQuery} from '@realm/react';

// File Imports
import {realmCreate, realmDelete, realmUpdate} from '../../Realm/RealmHelper';
import {AppContext} from '../../Components/LocalStorage/AppContext';
import styles from './styles';

const UserScreen = () => {
  const realm = useRealm();
  const users = useQuery('User');
  const context = useContext(AppContext);
  const [networkStatus, setNetworkStatus] = useState(true);
  const [newUser, setNewUser] = useState({name: '', phoneNo: '', address: ''});

  const addUser = () => {
    if (newUser.name.trim()) {
      realmCreate(realm, 'User', {
        _id: users.length + 1,
        ...newUser,
      });
      setNewUser({name: '', phoneNo: '', address: ''});
    }
  };

  useEffect(() => {
    if (context && context.isConnected !== undefined) {
      setNetworkStatus(context.isConnected ? true : false);
    }
  }, [context.isConnected]);

  const renderMainView = () => {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 130 : 0}>
          <View style={styles.networkStatus(networkStatus)} />
          {renderList()}
          {renderBottomView()}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };

  const renderList = () => {
    return (
      <FlatList
        data={users}
        keyExtractor={item => item._id.toString()}
        renderItem={({item}) => <UserItem user={item} />}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const UserItem = ({user}) => {
    const realm = useRealm();
    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState({
      name: user.name,
      phoneNo: user.phoneNo,
      address: user.address,
    });

    const deleteUser = () => {
      realmDelete(realm, user);
    };

    const updateUser = () => {
      realmUpdate(realm, () => {
        user.name = userData.name;
        user.phoneNo = userData.phoneNo;
        user.address = userData.address;
      });
      setEditMode(false);
    };

    return (
      <View style={styles.userContainer}>
        {editMode ? (
          <View>
            <TextInput
              style={styles.input}
              value={userData.name}
              onChangeText={text => setUserData({...userData, name: text})}
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              value={userData.phoneNo}
              onChangeText={text => setUserData({...userData, phoneNo: text})}
              placeholder="Phone No"
            />
            <TextInput
              style={styles.input}
              value={userData.address}
              onChangeText={text => setUserData({...userData, address: text})}
              placeholder="Address"
            />
            <TouchableOpacity
              onPress={updateUser}
              activeOpacity={0.8}
              style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.taskText} numberOfLines={1}>
              Name : {user.name}
            </Text>
            <Text style={styles.taskText} numberOfLines={1}>
              No : {user.phoneNo}
            </Text>
            <Text style={styles.taskText} numberOfLines={1}>
              Address : {user.address}
            </Text>
            <View style={styles.taskButtons}>
              <TouchableOpacity
                onPress={() => setEditMode(true)}
                activeOpacity={0.8}>
                <Image
                  source={require('../../Assets/edit.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteUser} activeOpacity={0.8}>
                <Image
                  source={require('../../Assets/delete.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderBottomView = () => {
    return (
      <View style={{paddingTop: 10}}>
        <TextInput
          style={styles.input}
          value={newUser.name}
          onChangeText={text => setNewUser({...newUser, name: text})}
          placeholder="Name"
          placeholderTextColor={'black'}
        />
        <TextInput
          style={styles.input}
          value={newUser.phoneNo}
          onChangeText={text => setNewUser({...newUser, phoneNo: text})}
          placeholder="Phone No"
          placeholderTextColor={'black'}
        />
        <TextInput
          style={styles.input}
          value={newUser.address}
          onChangeText={text => setNewUser({...newUser, address: text})}
          placeholder="Address"
          placeholderTextColor={'black'}
        />
        <TouchableOpacity
          onPress={addUser}
          activeOpacity={0.8}
          style={[
            styles.button,
            {marginBottom: Platform.OS == 'android' ? 20 : 4},
          ]}>
          <Text style={styles.buttonText}>Add User</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return renderMainView();
};

export default UserScreen;
