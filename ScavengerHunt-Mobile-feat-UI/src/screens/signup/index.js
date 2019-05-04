
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
  H1,
  Radio,
  ListItem,
  Left,
  Right
} from "native-base";
import styles from "./styles";

// const Item = Picker.Item;

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radio1: false,
      radio2: false,
    };
  }
  toggleRadio1() {
    this.setState({
      radio1: true,
      radio2: false,
    });
  }
  toggleRadio2() {
    this.setState({
      radio1: false,
      radio2: true,
    });
  }
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
          <ListItem
            style={styles.radioBtn}
            selected={this.state.radio1}
            onPress={() => this.toggleRadio1()}
          >
            <Left>
              <Text>Student</Text>
            </Left>
            <Right>
              <Radio
                // color={"#f0ad4e"}
                selectedColor={"#5cb85c"}
                selected={this.state.radio1}
                onPress={() => this.toggleRadio1()}
              />
            </Right>
          </ListItem>
          <ListItem
            style={styles.radioBtn}  
            selected={this.state.radio2}
            onPress={() => this.toggleRadio2()}
          >
            <Left>
              <Text>Teacher</Text>
            </Left>
            <Right>
              <Radio
                // color={"#f0ad4e"}
                selectedColor={"#5cb85c"}
                selected={this.state.radio2}
                onPress={() => this.toggleRadio2()}
              />
            </Right>
          </ListItem>

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