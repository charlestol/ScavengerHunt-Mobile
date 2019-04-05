import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
// import the different screens
import Loading from './src/screens/Loading'
import SignUp from './src/screens/SignUp'
import Login from './src/screens/Login'
import StudentDash from './src/screens/StudentDash'
import InstructorDash from './src/screens/InstructorDash'
// create our app's navigation stack
const App = createAppContainer(createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    StudentDash,
    InstructorDash
  },
  {
    initialRouteName: 'Loading'
  }
))
export default App
