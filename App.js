import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
// import the different screens
import Loading from './src/components/auth/loading'
import SignUp from './src/components/auth/signUp'
import Login from './src/components/auth/login'
import Student from './src/components/student/dashboard'
import Instructor from './src/components/instructor/dashboard'
import IEventItem from './src/components/instructor/eventItem'

// create our app's navigation stack
const App = createAppContainer(createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Student,
    Instructor,
    IEventItem
  },
  {
    initialRouteName: 'Loading'
  }
))
export default App
