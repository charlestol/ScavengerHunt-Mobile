import React, { Component } from "react";
import { StyleSheet, Alert } from "react-native";
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
  Textarea,
  Form,
  View
} from "native-base";
import { withNavigation } from "react-navigation";
import firebase from "firebase/app";
import "firebase/firestore";
require("../../config");
const db = firebase.firestore();

const SUCCESS_MSG = "Submitted!";
const ERROR_MSG = "Error, try submitting again.";
// const ERROR_MSG = "This scavenger hunt event is closed. Contact the instructor for more information."

class SubmitText extends Component {
  // Initial state
  state = {
    textEntry: "",
    submitted: false
  };

  onSubmitText = () => {
    // array destructuring so state exists in this function
    const { textEntry } = this.state;
    let task = this.props.navigation.state.params.task;
    let ac = this.props.navigation.state.params.ac;

    firebase.auth().onAuthStateChanged(user => {
      if (user === null) {
        return;
      }
      db.doc(`users/${user.email}`)
        .get()
        .then(doc => {
          let user = doc.data();

          // Data to be saved to the database
          const submitData = {
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            studentID: user.studentID,
            textEntry: textEntry,
            taskName: task
          };
          // save data in a task's submission collection
          db.doc(`scavengerHunts/${ac}`)
            .collection("members")
            .doc(user.email)
            .collection("submissions")
            .doc(task)
            .set(submitData)
            .then(() => {
              // console.log("Submission Successful!");
              Alert.alert(SUCCESS_MSG);
              this.setState({
                message: SUCCESS_MSG,
                submitted: true,
                textEntry: ""
              });
            })
            .catch(function(error) {
              // console.error("Error writing document: ", error);
              Alert.alert(ERROR_MSG);
              this.setState({
                message: ERROR_MSG
              });
            });
        });
    });
  };

  render() {
    const { message, textEntry, submitted } = this.state;

    const noText = textEntry === "";

    let task = this.props.navigation.state.params.task;
    let ac = this.props.navigation.state.params.ac;

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate("STaskItem", {
                  accessCode: ac,
                  taskName: task
                });
              }}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Text Submission</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ margin: 10 }}>
          <Form style={{ marginBottom: 10 }}>
            <Textarea
              rowSpan={5}
              bordered
              placeholder="Type here"
              onChangeText={textEntry => this.setState({ textEntry })}
              value={textEntry}
            />
          </Form>
          <Button
            block
            disabled={noText}
            title="Submit"
            onPress={() => this.onSubmitText()}
          >
            <Text>Submit</Text>
          </Button>
          {submitted && (
            <View>
              <Text>Submitted Text: </Text>
              <Text>{textEntry}</Text>
            </View>
          )}
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

export default withNavigation(SubmitText);

const styles = StyleSheet.create({
  container: {}
});
