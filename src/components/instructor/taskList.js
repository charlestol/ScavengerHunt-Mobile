import React, { Component } from 'react';  
import { View, Text, StyleSheet, Button } from 'react-native';

export default class ListTask extends Component {  
  render() {
    //   console.log('list')
    let ac = this.props.navigation.state.params.accessCode
    return (
      <View style={styles.container}>
        <Text>Task List</Text>
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })