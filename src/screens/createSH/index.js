import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Left,
  Right,
  Body,
  Button,
  Icon,
  Text,
  Content,
} from "native-base";
import styles from "./styles";

class CreateSH extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header>
        <Left>
            <Button 
              transparent 
              onPress={() => this.props.navigation.navigate('Teacher')}
              >
              <Icon name="arrow-back" />
              <Text>Back</Text>
            </Button>
        </Left>
          <Body>
            <Title>Create Hunt</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
        </Content>
      </Container>
    );
  }
}

export default CreateSH;
