import React, {Component} from 'react';
import {Alert, AsyncStorage, Image, Text, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';


type Props = {};
export default class HomePage  extends Component<Props> {
    getProtectedQuote() {
    Alert.alert('We will print a Chuck Norris quote')
  }

  userLogout() {
    Actions.Authentication();
  }
  getProtectedQuote() {
    AsyncStorage.getItem('id_token').then((token) => {
      // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
      fetch('http://192.168.XXX.XXX:3001/api/protected/random-quote', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      .then((response) => response.text())
      .then((quote) => {
        Alert.alert('Chuck Norris Quote', quote)
      })
      .done();
    })
  }
  async userLogout() {
    try {
      await AsyncStorage.removeItem('id_token');
      Alert.alert('Logout Success!');
      Actions.Authentication();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../images/chuck_norris.png')} style={styles.image}/>

        <TouchableOpacity style={styles.buttonWrapper} onPress={this.getProtectedQuote}>
          <Text style={styles.buttonText}> Get Chuck Norris quote! </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonWrapper} onPress={this.userLogout}>
          <Text style={styles.buttonText} > Log out </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
