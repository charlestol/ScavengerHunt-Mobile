
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
  Picker,
  Icon
} from "native-base";
import styles from "./styles";

// const Item = Picker.Item;

class Signup extends Component {
  render() {
    return (
      <Container >
        <Content>
          <Form>
          <Item floatingLabel>
              <Label>Email</Label>
              <Input />
            </Item>
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
              onPress={() => this.props.navigation.navigate('Login')}
              style={styles.signupBtn}
            >
              <Text>Sign Up</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Signup;