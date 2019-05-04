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
  H1,
  View
} from "native-base";
import firebase from "firebase/app";
require("../../config");

export default class StudentDash extends React.Component {
  state = { currentUser: null, dialogVisible: false };

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
      <Container style={styles.container}>
        <Header>
          <Left />
          <Body>
            <Title>Profile</Title>
          </Body>
          <Right />
        </Header>
        <Content
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1
          }}
          // style={{margin:50}}
        >
          <H1>{currentUser && currentUser.email}</H1>
          <Button
            style={{ margin: 20 }}
            block
            danger
            onPress={this.handleSignout}
          >
            <Text> Signout </Text>
          </Button>
        </Content>
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
