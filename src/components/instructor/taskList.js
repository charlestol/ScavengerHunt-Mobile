import React, { Component } from 'react';  
import { View, Text, StyleSheet, Button } from 'react-native';
import CreateTask from './taskCreate';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase/app';
import 'firebase/firestore'

require('../../config')
const db = firebase.firestore();

class ListTask extends Component {  
    state = {tasks: []}

    componentDidMount() {
        let ac = this.props.navigation.state.params.accessCode
        // console.log(this.props.navigation.state.params.accessCode)
        db.collection("scavengerHunts").doc(ac).collection('tasks')
        .onSnapshot(querySnapshot => {
            let tasks = [];
            querySnapshot.forEach(doc => {
                let data = doc.data();
                tasks.push(data);
            });
            // console.log(querySnapshot)
            this.setState({
              tasks,
            });
          });
    }

  render() {
    //   console.log('list')
    let ac = this.props.navigation.state.params.accessCode
    const { tasks } = this.state;
    return (
      <View style={styles.container}>
        {/* <Text>Task List</Text> */}
        <CreateTask ac={ac}/>
        <Text>Task List</Text>
        {tasks.map(task => (
            <Text key={task.name}>
                {task.name}
            </Text>
        ))}
        <Button
            title='Back'
            onPress={() => {
                this.props.navigation.navigate('IEventItem', {
                    accessCode: ac
                })
            }}
        />
      </View>
    );
  }
}

export default withNavigation(ListTask)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })