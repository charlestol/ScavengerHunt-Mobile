import React from "react";
import { Root } from "native-base";
import { createDrawerNavigator, createStackNavigator, createAppContainer } from "react-navigation";

import SideBar from "./screens/sidebar";
import Notifications from "./screens/notifications";
import Login from "./screens/login";
import Signup from "./screens/signup";
import ViewSH from "./screens/viewSH";
import CreateSH from "./screens/createSH";
import Student from "./screens/student";
import Teacher from "./screens/teacher";


const Drawer = createDrawerNavigator(
  {
    Notifications: {screen: Notifications},
    Login: {screen: Login},
    Signup: {screen: Signup},
    ViewSH: {screen: ViewSH},
    CreateSH: {screen: CreateSH},
    Student: {screen: Student},
    Teacher: {screen: Teacher}
  },
  {
    initialRouteName: "Login",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = createStackNavigator(
  {
    Drawer: { screen: Drawer }
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default () =>
  <Root>
    <AppContainer />
  </Root>;