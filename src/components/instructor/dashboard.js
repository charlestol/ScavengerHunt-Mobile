import React from 'react'
import { StyleSheet, ListView} from 'react-native'
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
  List,
  Tab,
  Tabs
} from "native-base";
import firebase from 'firebase/app';
import ListEvent from './eventList';
import CreateSH from './eventCreate';
import ActiveEvents from './eventsActive';

require('../../config')

export default class InstructorDash extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
      const { currentUser } = firebase.auth()
      this.setState({ currentUser })
  }

  handleSignout = () => {
    firebase.auth().signOut().then(function() {
  // Sign-out successful.
  this.props.navigation.navigate('Login')
}).catch(function(error) {
  // An error happened.
});
  }



  constructor(props) {
    super(props);
    this.state = {
      tab1: true,
      tab2: false,
      tab3: false,
      basic: true,
    };
  }

  toggleTab1() {
    this.setState({
      tab1: true,
      tab2: false,
      tab3: false
    });
  }
  toggleTab2() {
    this.setState({
      tab1: false,
      tab2: true,
      tab3: false
    });
  }
  toggleTab3() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: true
    });
  }  

render() {
    const { currentUser } = this.state
return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Dashboard</Title>
          </Body>
          <Right>
          <Button
              transparent
              onPress={() => this.props.navigation.navigate('EventCreate')}
            >
              <Text> Create </Text>
            </Button>
          </Right>
        </Header>
        <Content>

        <Tabs>
          <Tab heading="Active">
            <Content>
          <ActiveEvents />

            </Content>
          </Tab>
          <Tab heading="All">
          <Content>
          <ListEvent />
            </Content>
          </Tab>
        </Tabs>
        </Content>

        <Footer>
          <FooterTab>
            <Button onPress={() => this.props.navigation.navigate('DashboardT')}>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('ProfileT')}>
              <Icon name="person" />
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>

      // <View style={styles.container}>
      //   <Text>Instructor Dashboard</Text>
      //   <Text>
      //     Hi {currentUser && currentUser.email}!
      //   </Text>
      //   <CreateSH/> 
      //   <ActiveEvents />
      //   <ListEvent />
      //   <Button title="sign out" onPress={this.handleSignout}></Button>
      // </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  text: {
    alignSelf: "center",
    marginBottom: 7
  },
  mb: {
    marginBottom: 15
  },
  addFab: {
    backgroundColor: '#5067FF',
    position: "absolute",
    marginBottom: 10
  },
  addBtn: {
    flexDirection: "row",
    margin: 10
  }
})
