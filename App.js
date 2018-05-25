/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator, AsyncStorage, TextInput
} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import Home from './/components/Home';
import About from './/components/About';
import AsyncStorageExample from './components/AsyncStorageExample'

type Props = {};
export default class App extends Component<Props> {
  state = {
    'name': '',
    hasToken: false,
    isLoaded:false
 }
 componentDidMount = () => AsyncStorage.getItem('name')
 .then((value)=>this.setState({ 'name': value,hasToken:value!==null,isLoaded:true }))

 setName = (value) => {
    AsyncStorage.setItem('name', value);
    this.setState({ 'name': value });
 }
 render() {
   
      //  <View style = {styles.container}>
      //     <TextInput style = {styles.textInput} autoCapitalize = 'none' 
      //        onChangeText = {this.setName}/>
      //     <Text>
      //        {this.state.name}
      //     </Text>
      //  </View>
      if (!this.state.isLoaded) {
        return (
          <ActivityIndicator />
        )
      }else{
        return(
          <Router>
          <Scene key = "root">
             <Scene key = "home" component = {Home} title = "Home" initial = {!this.state.hasToken} />
             <Scene key = "about" component = {About} title = "About" initial={this.state.hasToken} />
          </Scene>
       </Router>
        )
      }
      
 }
}
const styles = StyleSheet.create ({
  container: {
     flex: 1,
     alignItems: 'center',
     marginTop: 50
  },
  textInput: {
     margin: 15,
     height: 35,
     borderWidth: 1,
     backgroundColor: '#7685ed'
  }
})