
import React, { Component } from "react";
import {
  Container,
  Content,
  Button,
  Item,
  Label,
  Input,
  Form,
  Text
} from "native-base";
import styles from "./styles";

class Login extends Component {
  render() {
    return (
      <Container >
        <Content style={styles.content}>
          <Form>
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
              onPress={() => this.props.navigation.navigate('Signup')}
              style={styles.signupBtn}
            >
              <Text>Sign Up</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Login;