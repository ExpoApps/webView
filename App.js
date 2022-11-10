import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { TextInput } from "react-native";
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Inject from './src/inject'

export default function App() {
  const [list, setList] = React.useState(['https://demo.carebuilder.se']);
  const [text, onChangeText] = React.useState('');
  const [dest, setDest] = React.useState(''); 
  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.text}
        key={item}
        onPress={() => setDest(item)}>
          {item}
      </Text>
      <Text style={styles.text}
          onPress={() => remove(item)}>
            x
      </Text>
    </View>
  );

  const remove = (item) => {
    setList(list.filter(link => link !== item));
  }

  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(list)
      await AsyncStorage.setItem('@carebuilder-linklist', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@carebuilder-linklist')
      jsonValue != null ? setList(JSON.parse(jsonValue)) : null;
    } catch(e) {
      // error reading value
    }
  }

  React.useEffect(()=>{
    getData()
  }, [])

  React.useEffect(()=>{
    storeData()
  }, [list])

  if(dest) {
    return (
      <WebView source={{ uri: dest }} />
    )
  }

  return <Inject />

  return (
    <View style={styles.container}>
      <View style={{width: '100%', height: '100%'}}>
        <TextInput 
          style={styles.input}
          placeholder="subdomän (https://subdomän.carebuilder.se)"
          keyExtractor={item => item}
          onChangeText={onChangeText}
          onEndEditing={() => setList([...list, `https://${text}.carebuilder.se`])}
        />
      <FlatList
        data={list}
        renderItem={renderItem}
      />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
    fontSize: 24,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'blue',
    fontSize: 18,
  }
});
