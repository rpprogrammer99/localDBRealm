import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 20,
  },
  touchable: {
    width: '100%',
    borderRadius: 24,
    borderColor: 'black',
    borderWidth: 0.8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: 'black',
  },
  imgArrow: {height: 20, width: 20},
});
