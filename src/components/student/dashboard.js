import React from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Content,
  Header,
  Title,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Right,
  Left,
  Body,
  Tab,
  Tabs
} from "native-base";
import SearchEvent from "./eventSearch";
import ActiveEvents from "./eventsActive";
import UserEventHistory from "./eventHistory";
import firebase from "firebase/app";
require("../../config");

export default class StudentDash extends React.Component {
  state = { currentUser: null };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened.
      });
  };

  render() {
    const { currentUser } = this.state;
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Dashboard</Title>
          </Body>
          <Right />
        </Header>
        <Tabs>
          <Tab heading="Active">
            <Content>
              <ActiveEvents />
            </Content>
          </Tab>
          <Tab heading="All">
            <Content>
              <UserEventHistory />
            </Content>
          </Tab>
        </Tabs>
        <Footer>
          <FooterTab>
            <Button
              onPress={() => this.props.navigation.navigate("DashboardS")}
            >
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate("ProfileS")}>
              <Icon name="person" />
              <Text>Profile</Text>
            </Button>
            <Button
              onPress={() => this.props.navigation.navigate("EventSearch")}
            >
              <Icon name="search" />
              <Text>Search</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {}
});
