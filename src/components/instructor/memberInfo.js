import React, { Component } from 'react';  
import { View, Text, StyleSheet, Button } from 'react-native';

export default class MemberInfo extends Component {  
  render() {
    let ac = this.props.navigation.state.params.accessCode
    return (
      <View style={styles.container}>
        <Text>Member Info</Text>
        <Button
            title='Back'
            onPress={() => {
                this.props.navigation.navigate('IMemberList', {
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