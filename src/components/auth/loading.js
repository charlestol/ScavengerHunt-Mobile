// Loading.js
//Screen that displays until we determine the auth state of a user
import React from 'react'
import { Font } from 'expo';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
require('../../config')
import firebase from 'firebase'
import 'firebase/firestore'
const db = firebase.firestore()

export default class Loading extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  componentDidMount() {
    Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
      Entypo: require("native-base/Fonts/Entypo.ttf"),
      Feather: require("native-base/Fonts/Feather.ttf"),
      FontAwesome: require("native-base/Fonts/FontAwesome.ttf"),
    });
    this.setState({ isReady: true });
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
