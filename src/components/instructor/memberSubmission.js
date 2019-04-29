import React, { Component } from 'react';  
import { View, Text, StyleSheet, Button } from 'react-native';

export default class Submission extends Component {  
  render() {
    let ac = this.props.navigation.state.params.accessCode
    let email = this.props.navigation.state.params.email

    return (
      <View style={styles.container}>
        <Text>Submission Review</Text>
        <Button
            title='Back'
            onPress={() => {
                this.props.navigation.navigate('IMemberInfo', {
                    accessCode: ac,
                    email: email
                })
            }}
        />
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