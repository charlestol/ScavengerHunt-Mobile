import React, { Component } from "react";
import Dialog from "react-native-dialog";
import {StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Header,
  Title,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Form,
  Item,
  Label,
  Input,
  View,
  Badge,
  Tab,
  Tabs,
  List,
  ListItem
} from "native-base";

import styles from "./styles";

const datas = [
  "Take a picture of a tree",
  "Go to a park",
  "Write about the field trip",
  "Nature walk",
  "Explore the campus",
  "Go to the library",
  "Read a book",
  "Take a picture of a tree",
  "Go to a park",
  "Write about the field trip",
  "Nature walk",
  "Explore the campus",
  "Go to the library",
  "Read a book",
];
class Student extends Component {

  onPressNotification(){
    this.toggleTab2();
    // this.props.navigation.navigate('Notifications');
  }
  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };
  handleAdd = () => {
    this.setState({ dialogVisible: false });
  };

  constructor(props) {
    super(props);
    this.state = {
      tab1: true,
      tab2: false,
      dialogVisible: false
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
            <Title>Dashboard</Title>
          </Body>
          <Right>
          <Button
              transparent
              onPress={this.showDialog}
            >
              <Icon name="add" />
            </Button>
          </Right>
        </Header>
        <Tabs>
          <Tab heading="All">
          <Content>
            <List
              dataArray={datas}
              renderRow={data =>
              <ListItem>
                <Left>
                  <Body>
                    <Text style={{fontWeight: "normal"}}> {data}</Text>
                    <Text note> Due: April 15, 2016</Text>
                  </Body>
                </Left>
                <Button 
                  transparent 
                  onPress={() => this.props.navigation.navigate('ViewSH')}
                >
                  <Text>View</Text>
                </Button>
              </ListItem>}
            />
          </Content>
          </Tab>
          <Tab heading="Active">
            <Content>
            </Content>
          </Tab>
          <Tab heading="Completed">
            <Content>
            </Content>
          </Tab>
        </Tabs>
        <Footer>
          <FooterTab>
            <Button active={this.state.tab1} onPress={() => this.toggleTab1()}>
              <Icon active={this.state.tab1} name="home" />
              <Text>Home</Text>
            </Button>
            <Button 
              badge 
              vertical 
              active={this.state.tab2} onPress={() => this.onPressNotification()}
            >
              <Badge style={{ backgroundColor: "red" }}><Text>2</Text></Badge>
              <Icon active={this.state.tab2} name="notifications" />
              <Text>Notifications</Text>
            </Button>
          </FooterTab>
        </Footer>
        <View>
          <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Add Scavenger Hunt</Dialog.Title>
          <Dialog.Description>
            To add a scavenger hunt, input the add code.
          </Dialog.Description>
          <Form>
            <Item floatingLabel last>
              <Label>Add Code</Label>
              <Input/>
            </Item>
          </Form>
          <Dialog.Button style={styles.popupBtn} label="Cancel" onPress={this.handleCancel}/>
          <Dialog.Button style={styles.popupBtn} label="Add" onPress={this.handleAdd} />
        </Dialog.Container>
      </View>
      </Container>
    );
  }
}

export default Student;
