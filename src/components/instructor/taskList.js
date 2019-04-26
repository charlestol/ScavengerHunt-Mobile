import React, { Component } from 'react';  
import { View, Text, StyleSheet } from 'react-native';

export default class ListTask extends Component {  
  render() {
    //   console.log('list')
    return (
      <View style={styles.container}>
        <Text>Task List</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })