import React, { Component } from 'react';  
import { View, Text, StyleSheet, Button } from 'react-native';

export default class MemberInfo extends Component {  
  render() {
    return (
      <View style={styles.container}>
        <Text>Member Info</Text>
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