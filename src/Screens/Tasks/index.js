// Global Imports
import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {useRealm, useQuery} from '@realm/react';

// File Imports
import {AppContext} from '../../Components/LocalStorage/AppContext';
import {
  realmClearAll,
  realmCreate,
  realmDelete,
  realmInsertArray,
  realmUpdate,
} from '../../Realm/RealmHelper';
import styles from './styles';

const TaskScreen = () => {
  const realm = useRealm();
  const tasks = useQuery('Task');
  const context = useContext(AppContext);
  const [newTask, setNewTask] = useState('');
  const [networkStatus, setNetworkStatus] = useState(false);

  const addTask = () => {
    if (newTask.trim()) {
      const nextId = tasks.length
        ? Math.max(...tasks.map(task => task._id)) + 1
        : 1;
      realmCreate(realm, 'Task', {
        _id: nextId,
        name: newTask,
        isComplete: false,
      });
      setNewTask('');
    }
  };

  useEffect(() => {
    if (context && context.isConnected !== undefined) {
      setNetworkStatus(context.isConnected ? true : false);
    }
    // if (context.isConnected) {
    //   updateAPI();
    // }
  }, [context.isConnected]);

  const updateAPI = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let data = tasks[0];

    const raw = JSON.stringify(data);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'https://ca4da5455cad8406c595.free.beeceptor.com/api/users/',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result) {
          alert(JSON.stringify(result));
        }
      })
      .catch(error => console.error(error));
  };

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
        data={tasks}
        keyExtractor={item => item._id.toString()}
        renderItem={({item}) => <TaskItem task={item} />}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const TaskItem = ({task}) => {
    const realm = useRealm();
    const [editMode, setEditMode] = useState(false);
    const [taskName, setTaskName] = useState(task.name);

    const toggleTask = () => {
      realmUpdate(realm, () => {
        task.isComplete = !task.isComplete;
      });
    };

    const deleteTask = () => {
      realmDelete(realm, task);
    };

    const updateTask = () => {
      realmUpdate(realm, () => {
        task.name = taskName;
      });
      setEditMode(false);
    };

    return (
      <View style={styles.taskContainer}>
        {editMode ? (
          <View>
            <TextInput
              value={taskName}
              style={styles.input}
              placeholder="Edit task"
              onChangeText={setTaskName}
              placeholderTextColor={'black'}
            />
            <TouchableOpacity
              onPress={updateTask}
              activeOpacity={0.8}
              style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text numberOfLines={2} style={styles.taskText(task.isComplete)}>
              {task.name}
            </Text>
            <View style={styles.taskButtons}>
              <TouchableOpacity onPress={toggleTask} activeOpacity={0.8}>
                <Image
                  source={
                    task.isComplete
                      ? require('../../Assets/undo.png')
                      : require('../../Assets/checked.png')
                  }
                  style={styles.imgComplete(task.isComplete)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setEditMode(true)}
                activeOpacity={0.8}>
                <Image
                  source={require('../../Assets/edit.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteTask} activeOpacity={0.8}>
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
          value={newTask}
          onChangeText={setNewTask}
          placeholder="New Task"
          placeholderTextColor={'black'}
        />
        <TouchableOpacity
          onPress={addTask}
          activeOpacity={0.8}
          style={[
            styles.button,
            {marginBottom: Platform.OS == 'android' ? 20 : 4},
          ]}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => realmCreate(realm, 'Task', allArr)}
          activeOpacity={0.8}
          style={[styles.button, {marginTop: 20}]}>
          <Text>Insert array</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => realmClearAll(realm)}
          activeOpacity={0.8}
          style={[styles.button, {marginTop: 20}]}>
          <Text>Delete All</Text>
        </TouchableOpacity> */}
      </View>
    );
  };

  return renderMainView();
};

export default TaskScreen;
