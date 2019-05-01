import React, {Component} from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Font } from "expo";
// import the different screens
import Loading from './src/components/auth/loading'
import SignUp from './src/components/auth/signUp'
import Login from './src/components/auth/login'

import Student from './src/components/student/dashboard'
import SEventItem from './src/components/student/eventItem'
import STaskItem from './src/components/student/taskItem'
import SubmitImage from './src/components/student/submitImage'
import SubmitText from './src/components/student/submitText'
import DashboardS from './src/components/student/dashboard'


import Instructor from './src/components/instructor/dashboard'
import IEventItem from './src/components/instructor/eventItem'
import IEventList from './src/components/instructor/eventList'
import IMemberList from './src/components/instructor/memberList'
import ITaskList from './src/components/instructor/taskList'
import ITaskItem from './src/components/instructor/taskItem'
import IMemberInfo from './src/components/instructor/memberInfo'
import IMemberSubmission from './src/components/instructor/memberSubmission'
import ProfileT from './src/components/instructor/profileT'
import DashboardT from './src/components/instructor/dashboard'
import EventCreate from './src/components/instructor/eventCreate'





// create our app's navigation stack
const Routes = createAppContainer(createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Student,
    SEventItem,
    STaskItem,
    SubmitText,
    SubmitImage,
    Instructor,
    IEventItem,
    IEventList,
    IMemberList,
    ITaskList,
    ITaskItem,
    IMemberInfo,
    IMemberSubmission,
    ProfileT,
    DashboardT,
    DashboardS,
    EventCreate
  },
  {
    initialRouteName: 'Loading'
  }
))

export default class App extends Component {
  state = {
    fontLoaded: false,
    loading: false
  };

  async componentWillMount() {
    try {
      this.setState({ loading: true })
      await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
      });
      this.setState({ fontLoaded: true, loading: false });
    } catch (error) {
      console.log('error loading icon fonts', error);
      this.setState({ loading: false })
    }
  }

  render() {
    const { loading } = this.state
    return(
      (loading) ? <Text>Loading...</Text> : <Routes />

    )
  }
}
// export default App
