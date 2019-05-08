
import React, { Component } from "react";
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
import styles from "./styles";

class Login extends Component {
  render() {
    return (
      <Container >
        <Content style={styles.content}>
          <H1 style={{marginTop: 200, textAlign: "center"}}>Login</H1>
          <Form style={{marginLeft: 35, marginRight: 35}}>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry />
            </Item>
          </Form>
          <Button
              block
              onPress={() => this.props.navigation.navigate('Student')}
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
              onPress={() => this.props.navigation.navigate('Signup')}
              style={styles.signupBtn}
            >
              <Text>Create an account</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Login;