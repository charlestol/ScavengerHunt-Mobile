import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  ListItem,
  List
} from "native-base";

import styles from "./styles";

class Notifications extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tab1: true,
      tab2: false,
    };
  }
  toggleTab1() {
    this.setState({
      tab1: true,
      tab2: false,
    });
  }
  toggleTab2() {
    this.setState({
      tab1: false,
      tab2: true
    });
  }
  onPressNotification(){
    this.toggleTab2();
    this.props.navigation.navigate('Notifications');
  }
  onPressHome(){
    this.toggleTab1();
    this.props.navigation.navigate('Home');
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Notifications</Title>
          </Body>
          <Right />
        </Header>

        <Content>
        
        </Content>

        <Footer>
          <FooterTab>
            <Button active={this.state.tab1} onPress={() => this.onPressHome()}>
              <Icon active={this.state.tab1} name="home" />
              <Text>Home</Text>
            </Button>
            <Button active={this.state.tab2} onPress={() => this.onPressNotification()}>
              <Icon active={this.state.tab2} name="notifications" />
              <Text>Notifications</Text>
            </Button>
          </FooterTab>
        </Footer>


      </Container>
    );
  }
}

export default Notifications;
