import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
// import the different screens
import Loading from './src/components/auth/loading'
import SignUp from './src/components/auth/signUp'
import Login from './src/components/auth/login'

import Student from './src/components/student/dashboard'
import SEventItem from './src/components/student/eventItem'
import SEventResults from './src/components/student/eventResults'
import STaskItem from './src/components/student/taskItem'

import Instructor from './src/components/instructor/dashboard'
import IEventItem from './src/components/instructor/eventItem'
import IEventList from './src/components/instructor/eventList'
import IMemberList from './src/components/instructor/memberList'
import ITaskList from './src/components/instructor/taskList'
import ITaskItem from './src/components/instructor/taskItem'
import IMemberInfo from './src/components/instructor/memberInfo'
import IMemberSubmission from './src/components/instructor/memberSubmission'


// create our app's navigation stack
const App = createAppContainer(createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Student,
    SEventItem,
    STaskItem,
    Instructor,
    IEventItem,
    IEventList,
    IMemberList,
    ITaskList,
    ITaskItem,
    IMemberInfo,
    IMemberSubmission
  },
  {
    initialRouteName: 'Loading'
  }
))
export default App
