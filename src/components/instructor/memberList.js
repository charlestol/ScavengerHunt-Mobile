import React, { Component } from "react";
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
  Left,
  Right,
  Body,
  H2,
  View
} from "native-base";
import firebase from "firebase/app";
import "firebase/firestore";

require("../../config");
const db = firebase.firestore();

export default class ListMember extends Component {
  state = { members: [] };

  componentDidMount() {
    let ac = this.props.navigation.state.params.accessCode;
    // console.log(this.props.navigation.state.params.accessCode)
    this.unsubscribe = db
      .collection("scavengerHunts")
      .doc(ac)
      .collection("members")
      .onSnapshot(querySnapshot => {
        let members = [];
        querySnapshot.forEach(doc => {
          let data = doc.data();
          members.push(data);
        });
        // console.log(querySnapshot)
        this.setState({
          members
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    //   console.log('list')
    let ac = this.props.navigation.state.params.accessCode;
    const { members } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate("IEventItem", {
                  accessCode: ac
                });
              }}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Member List</Title>
          </Body>
          <Right />
        </Header>

        <Content style={styles.content}>
          <H2 />
          {members.map(member => (
            <View key={member.email}>
              <Button
                style={{ marginBottom: 10 }}
                block
                rounded
                bordered
                onPress={() => {
                  this.props.navigation.navigate("IMemberInfo", {
                    accessCode: ac,
                    email: member.email
                  });
                }}
              >
                <Text>{member.name}</Text>
              </Button>
            </View>
          ))}
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
  container: {},
  content: {
    margin: 10
  }
});
