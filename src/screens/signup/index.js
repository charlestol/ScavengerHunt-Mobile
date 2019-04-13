
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
  Icon,
  H1
} from "native-base";
import styles from "./styles";

// const Item = Picker.Item;

class Signup extends Component {
  render() {
    return (
      <Container >
        <Content>
          <H1 style={{marginTop: 200, textAlign: "center"}}>Sign up</H1>
          <Form style={{marginLeft: 35, marginRight: 35}}>
          <Item floatingLabel>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>First Name</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Last Name</Label>
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