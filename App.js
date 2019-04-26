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
import IEventList from './src/components/instructor/eventList'
import IMemberList from './src/components/instructor/memberList'
import ITaskList from './src/components/instructor/taskList'

// create our app's navigation stack
const App = createAppContainer(createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Student,
    Instructor,
    IEventItem,
    IEventList,
    IMemberList,
    ITaskList
  },
  {
    initialRouteName: 'Loading'
  }
))
export default App
