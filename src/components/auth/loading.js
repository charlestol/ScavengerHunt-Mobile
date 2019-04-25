// Loading.js
//Screen that displays until we determine the auth state of a user
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
require('../../config')
import firebase from 'firebase'
import 'firebase/firestore'
const db = firebase.firestore()

export default class Loading extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(!user) {
        this.props.navigation.navigate('Login')
      } else {
        db.collection('users').doc(user.email).get()
        .then(doc => {
          const role = doc.data().role
          this.props.navigation.navigate(role==="STUDENT" ? 'Student':'Instructor')
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
