import React, { Component } from "react";
import {View } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  H1,
} from "native-base";
import styles from "./style";

const datas = [
  {
    name: "Student Dashboard",
    route: "Student",
    icon: "home",
    bg: "#C5F442"
  },
  {
    name: "Teacher Dashboard",
    route: "Teacher",
    icon: "home",
    bg: "#C5F442"
  },
  {
    name: "Login",
    route: "Login",
    icon: "phone-portrait",
    bg: "#C5F442"
  },
  {
    name: "Logout",
    route: "Logout",
    icon: "exit",
    bg: "#C5F442"
  }
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    return (
      <Container>
      
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <View style={styles.navHeader}>
            <H1 style={{fontWeight: 'bold'}}>User Name</H1>
            <Text>Email</Text>
          </View>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
