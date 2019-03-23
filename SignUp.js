// SignUp.js
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'firebase';
require('./src/config')

export default class SignUp extends React.Component {
  state = { email: '', password: '', userType: '', firstName: '', lastName: '', studentID: '', errorMessage: null }
handleSignUp = () => {
  // TODO: Firebase stuff...
  //Add user stuff later
  firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  console.log('handleSignUp')
}

onClickStudent = () => {
  this.setState({
    userType: 'student'
  });
}

onClickInstructor = () => {
  this.setState({
    userType: 'instructor'
  });
}

render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <View style={{flexDirection:'row'}}>
          <Button title="Student" onPress={this.onClickStudent}/>
          <Button title="Instructor" onPress={this.onClickInstructor}/>
        </View>

        <TextInput
          placeholder="First Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={firstName => this.setState({ firstName })}
          value={this.state.firstName}
        />
        <TextInput
          placeholder="Last Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={lastName => this.setState({ lastName })}
          value={this.state.lastName}
        />
        {this.state.userType === 'student' &&
          <TextInput
            placeholder="Student ID"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={studentID => this.setState({ studentID })}
            value={this.state.studentID}
          />
        }
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>

    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})
