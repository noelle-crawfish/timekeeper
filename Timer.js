import React, {Component} from 'react'
import  {Vibration, StyleSheet, Text, View, Button} from 'react-native'
import PropTypes from 'prop-types'

export class Timer extends React.Component {
  static propTypes = {
    studyTime: PropTypes.number.isRequired,
    breakTime: PropTypes.number.isRequired,
    unmountMe: PropTypes.func.isRequired,
  }

  state = {
    timeRemaining: this.props.studyTime * 60,
    mode: "study",
    paused: false,
  }

  componentDidMount() {
    this.timer = setInterval(this.countdown, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  countdown = () => {
    if(this.state.paused) console.log("paused")
    else if(this.state.timeRemaining == 0) {
      Vibration.vibrate()
      if(this.state.mode == "study") {
        this.setState({mode: "break", timeRemaining: this.props.breakTime*60})
      } else {
        this.setState({mode: "study", timeRemaining: this.props.studyTime*60})
      }
    } else this.setState(prevState => ({timeRemaining: prevState.timeRemaining - 1}))
  }

  render() {
    return (
      <View style = {styles.body}>
        <Text style = {styles.text}>{Math.floor(this.state.timeRemaining / 60)}:{this.state.timeRemaining % 60}</Text>
        <View style = {styles.container}>
          <Button
            title = "START / STOP"
            onPress = {() => this.state.paused = !this.state.paused}
          />
          <View style = {styles.padder}>
          </View>
          <Button
            title = "RESET"
            onPress = {() => this.props.unmountMe()}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },

  container: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  padder: {
    height: 100,
    width: 55,
  },

  text: {
    fontSize: 150,
  },
})


