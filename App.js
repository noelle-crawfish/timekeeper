import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { Timer } from './Timer.js'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      reset: true,
      st: 25,
      bt: 5,
    }
  }

  render() {
    if(this.state.reset) {
      return (
        <View style = {styles.body}>
          <View style = {styles.container}>
            <TextInput 
              style = {styles.userInput}
              keyboardType = 'numeric'
              maxLength = {3}
              onChangeText = {(value) => this.setState({st: value})}
            />
            <Text style = {styles.text}>:</Text>
            <TextInput 
              style = {styles.userInput}
              keyboardType = 'numeric'
              maxLength = {3}
              onChangeText = {(value) => this.setState({bt: value})}
            />
          </View>
          <View style = {styles.container}>
            <Button
              title = "START"
              onPress = { () => this.startTimer() }
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style = {styles.container}>
          <Timer studyTime={parseInt(this.state.st)} breakTime={parseInt(this.state.bt)} unmountMe={this.resetMe} />
        </View>
      );
    }
  }

  resetMe = () => {
    this.setState({reset: true})
  }

  startTimer() {
    if(isNaN(parseInt(this.state.st)) || isNaN(parseInt(this.state.bt))) { 
      Alert.alert("Inputs must be numbers")
    } else this.setState({reset: false})
  }
}


const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  userInput: {
    borderWidth: 5,
    width: '35%',
    height: 150,
    margin: '5%',
    textAlign: 'center',
    fontSize: 55,
    fontWeight: 'bold',
  },

  text: {
    fontSize: 40,
  },
});
