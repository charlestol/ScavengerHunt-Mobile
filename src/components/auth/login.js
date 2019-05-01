// Login.js
import React from 'react'
import {
  Container,
  Content,
  Button,
  Item,
  Label,
  Input,
  Form,
  Text,
  H1
} from "native-base";
import { StyleSheet, TextInput, View} from 'react-native'
import firebase from 'firebase';
require('../../config')

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('StudentDash'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <Container >
        <Content style={styles.content}>
          <H1 style={{marginTop: 200, textAlign: "center"}}>Login</H1>
          {this.state.errorMessage &&
          <Text style={{ 
            color: 'red',
            marginRight: 50,
            marginLeft: 50
            }}>
            {this.state.errorMessage}
          </Text>}
          <Form style={{marginLeft: 35, marginRight: 35}}>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input 
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input 
                secureTextEntry
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
            </Item>
          </Form>
          <Button
              block
              onPress={this.handleLogin}
              style={styles.loginBtn}
            >
              <Text>Sign In</Text>
          </Button>
          <Button
              block
              transparent
              onPress={() => this.props.navigation.navigate('')}
              style={styles.forgotBtn}
            >
              <Text>Forgot Password</Text>
          </Button>
          <Button
              block
              transparent
              onPress={() => this.props.navigation.navigate('SignUp')}
              style={styles.signupBtn}
            >
              <Text>Create an account</Text>
          </Button>
        </Content>
      </Container>
      // <View style={styles.container}>
      //   <Text>Login</Text>
      //   {this.state.errorMessage &&
      //     <Text style={{ color: 'red' }}>
      //       {this.state.errorMessage}
      //     </Text>}
      //   <TextInput
      //     style={styles.textInput}
      //     autoCapitalize="none"
      //     placeholder="Email"
      //     onChangeText={email => this.setState({ email })}
      //     value={this.state.email}
      //   />
      //   <TextInput
      //     secureTextEntry
      //     style={styles.textInput}
      //     autoCapitalize="none"
      //     placeholder="Password"
      //     onChangeText={password => this.setState({ password })}
      //     value={this.state.password}
      //   />
      //   <Button title="Login" onPress={this.handleLogin} />
      //   <Button
      //     title="Don't have an account? Sign Up"
      //     onPress={() => this.props.navigation.navigate('SignUp')}
      //   />
      // </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  loginBtn: {
    marginTop: 50,
    marginRight: 50,
    marginLeft: 50
  },
  signupBtn: {
    marginTop: 15,
    marginRight: 50,
    marginLeft: 50
  },
  forgotBtn: {
    marginTop: 200,
    marginRight: 50,
    marginLeft: 50
  }
})
