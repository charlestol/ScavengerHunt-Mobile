import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, View, Button, Text} from "native-base";
import { withNavigation } from "react-navigation";
import firebase from "firebase/app";
import "firebase/firestore";
require("../../config");
const db = firebase.firestore();

class EventHistory extends Component {
  state = { scavengerHunts: [] };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user === null) {
        return;
      }

      this.unsubscribe = db
        .collection("users")
        .doc(user.email)
        .collection("history")
        .onSnapshot(snapshot => {
          let scavengerHunts = [];

          snapshot.forEach(doc => {
            scavengerHunts.push({ ...doc.data() });
          });

          this.setState({
            scavengerHunts
          });
        });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { scavengerHunts } = this.state;
    return (
      <Container>
        {scavengerHunts.map(scavengerHunt => (
          <View key={scavengerHunt.accessCode}>
            <Button
              style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
              full
              rounded
              bordered
              // title={scavengerHunt.name}
              onPress={() => {
                this.props.navigation.navigate("SEventItem", {
                  accessCode: scavengerHunt.accessCode
                });
              }}
            >
              <Text>{scavengerHunt.name}</Text>
            </Button>
          </View>
        ))}
      </Container>
    );
  }
}

export default withNavigation(EventHistory);
