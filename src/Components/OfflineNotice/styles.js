// File Imports
import {Dimensions} from 'react-native';

const styles = {
  offlineContainer: {
    backgroundColor: 'red',
    paddingTop: 25,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    position: 'absolute',
    top: 0,
  },
  offlineText: {
    color: 'white',
    paddingVertical: 5,
    paddingBottom: 10,
    fontSize: 16,
  },
};

export default styles;
