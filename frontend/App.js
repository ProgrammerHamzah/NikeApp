import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import Navigation from './src/navigation';
import { Provider } from 'react-redux';
import {store} from './src/store'

export default function App() {
  return (
    <Provider store={store} >
      <Navigation/>
      <StatusBar style='auto' />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  itemContainer:{
    width:'50%',
    padding:1
  }
});
