import React, { Component } from "react";
import { View } from "react-native";

import { Container, Content, Button, Text } from "native-base";
import firebase from "firebase/app";
import { withNavigation } from "react-navigation";

import "firebase/firestore";
require("../../config");
const db = firebase.firestore();

class ActiveEvents extends Component {
  state = { activeEvents: [] };

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user === null) {
        return;
      }

      const today = new Date();

      db.collection("scavengerHunts")
        .where("email", "==", user.email)
        .onSnapshot(snapshot => {
          let activeEvents = [];

          snapshot.forEach(doc => {
            let data = doc.data();
            const closed = data.closed;
            const endDate = data.dateEnd.seconds;
            // convert millisec to sec
            const today = (Date.now() / 1000).toFixed(0);

            if (today < endDate && !closed) {
              activeEvents.push(data);
            }
          });

          this.setState({
            activeEvents
          });
        });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { activeEvents } = this.state;

    return (
      <Container>
        {activeEvents.map(scavengerHunt => (
          <View key={scavengerHunt.accessCode}>
            <Button
              style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
              full
              rounded
              bordered
              onPress={() => {
                this.props.navigation.navigate("IEventItem", {
                  accessCode: scavengerHunt.accessCode
                });
              }}
            >
              <Text>{scavengerHunt.name} </Text>
            </Button>
          </View>
        ))}
      </Container>
    );
  }
}

export default withNavigation(ActiveEvents);
