import React from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  H1
} from "native-base";
import firebase from "firebase/app";
require("../../config");

export default class InstructorDash extends React.Component {
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
        this.props.navigation.navigate("Login");
      })
      .catch(function(error) {
        // An error happened.
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      tab1: false,
      tab2: false
    };
  }

  toggleTab1() {
    this.setState({
      tab1: true,
      tab2: false
    });
  }
  toggleTab2() {
    this.setState({
      tab1: false,
      tab2: true
    });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <Container style={styles.container}>
        <Header>
          <Left />
          <Body>
            <Title>Dashboard</Title>
          </Body>
          <Right />
        </Header>
        <Content
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1
          }}
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
              onPress={() => this.props.navigation.navigate("DashboardT")}
            >
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate("ProfileT")}>
              <Icon name="person" />
              <Text>Profile</Text>
            </Button>
            <Button
              onPress={() => this.props.navigation.navigate("EventCreate")}
            >
              <Icon name="ios-create" />
              <Text>Create</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  }
});
