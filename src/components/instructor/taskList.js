import React, { Component } from "react";
// import { View, Text, StyleSheet, Button } from 'react-native';
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
  H1,
  H2,
  View
} from "native-base";
import CreateTask from "./taskCreate";
// import TaskItem from './taskItem';
import { withNavigation } from "react-navigation";
import firebase from "firebase/app";
import "firebase/firestore";

require("../../config");
const db = firebase.firestore();

class ListTask extends Component {
  state = { tasks: [] };

  componentDidMount() {
    let ac = this.props.navigation.state.params.accessCode;
    // console.log(this.props.navigation.state.params.accessCode)
    this.unsubscribe = db
      .collection("scavengerHunts")
      .doc(ac)
      .collection("tasks")
      .onSnapshot(querySnapshot => {
        let tasks = [];
        querySnapshot.forEach(doc => {
          let data = doc.data();
          tasks.push(data);
        });
        // console.log(querySnapshot)
        this.setState({
          tasks
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    //   console.log('list')
    let ac = this.props.navigation.state.params.accessCode;
    const { tasks } = this.state;
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
            <Title>Tasks</Title>
          </Body>
          <Right />
        </Header>

        <Content style={{margin:10}}>
          <CreateTask ac={ac} />
          <H1 style={{marginTop: 25, marginBottom: 10}}>Task List</H1>
          {tasks.map(task => (
            <View key={task.name}>
              <Button
              style={{marginBottom:10}}
                title={task.name}
                block
                rounded
                bordered
                onPress={() => {
                  this.props.navigation.navigate("ITaskItem", {
                    accessCode: ac,
                    name: task.name
                  });
                }}
              > 
              <Text>{task.name} </Text>
              </Button>
            </View>
          ))}
          <Button
            title="Back"
            onPress={() => {
              this.props.navigation.navigate("IEventItem", {
                accessCode: ac
              });
            }}
          />
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

      // <View style={styles.container}>
      //   {/* <Text>Task List</Text> */}
      //   <CreateTask ac={ac}/>
      //   <Text>Task List</Text>
      //   {tasks.map(task => (
      //       <View key={task.name}>
      //         <Button
      //           title={task.name}
      //           onPress={() => {
      //             this.props.navigation.navigate('ITaskItem', {
      //               accessCode: ac,
      //               name: task.name
      //             })
      //           }}
      //         />
      //       </View>
      //     ))}
      //   <Button
      //       title='Back'
      //       onPress={() => {
      //           this.props.navigation.navigate('IEventItem', {
      //               accessCode: ac
      //           })
      //       }}
      //   />
      // </View>
    );
  }
}

export default withNavigation(ListTask);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  }
});
