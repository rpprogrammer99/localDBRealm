import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: Platform.OS == 'android' ? 12 : 16,
    marginTop: Platform.OS == 'android' ? 10 : 20,
  },
  taskContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderColor: '#226896',
    borderWidth: 1,
    paddingHorizontal: 18,
    borderRadius: 24,
    marginBottom: 8,
    color: 'black',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 24,
    alignSelf: 'center',
    backgroundColor: '#226896',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  taskButtons: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  imgComplete: isComplete => ({
    height: 32,
    width: 32,
    marginHorizontal: 4,
  }),
  image: {
    height: 30,
    width: 30,
    marginHorizontal: 6,
  },
  taskText: val => ({
    textDecorationLine: val ? 'line-through' : 'none',
    fontSize: 16,
    color: 'black',
  }),
  networkStatus: val => ({
    height: 18,
    width: 18,
    borderRadius: 24,
    backgroundColor: val ? 'green' : 'red',
    alignSelf: 'flex-end',
    marginBottom: 20,
  }),
});
