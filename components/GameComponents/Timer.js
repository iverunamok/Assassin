import React, {Component} from 'react'
import {Button, View, Text, FlatList, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import {apiUrl} from '../../localConfig'
import {startCountdownTime} from '../../redux/actions'

class Timer extends Component{
  constructor(props) {
    super(props)
    this.state = {
      time: 0
    }
    this.twoMinutes = 30
  }

countDown(){
  let self = this
  this.secondCounter = (Date.now() - this.startTimer) /1000
  this.setState({time: this.secondCounter})
  console.log("we have started the countdown", this.secondCounter)
  if (this.secondCounter > this.twoMinutes) {
    fetch(apiUrl + `/user/hireable`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.token
      },
      body: JSON.stringify({
        username: this.props.username
      })
    })
    .then(()=> {
      clearInterval(self.interval)
      console.log("Two Minutes has passed!")
    })
  }
 }

  componentWillMount(){
    this.startTimer = Date.now()
    this.secondCounter = (Date.now() - this.startTimer) /1000
    this.interval = setInterval(this.countDown.bind(this), 1000)
    console.log("here be your countdown to death", this.secondCounter)
   }

 render(){
   return(
    <View>

      {(this.twoMinutes - parseInt(this.secondCounter)) <= 0 ?  <Text> </Text> : <Text style = {styles.words}>Termination Transponder active in {(this.twoMinutes - parseInt(this.secondCounter))} Seconds</Text>}

    </View>
  )
 }
}

const styles = StyleSheet.create({
  words: {
    color: 'white',
  }
})

const mapStateToProps = (state) => ({
  token: state.token,
   username: state.username
})

const TimerConnector = connect(mapStateToProps)

export default TimerConnector(Timer)
