import React, { Component } from "react";
import { Image, Dimensions } from "react-native";
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
  Textarea,
  Content,
  Card,
  CardItem
} from "native-base";
import styles from "./styles";
const deviceWidth = Dimensions.get("window").width;
const cardImage = require("../../../assets/Thumbnail2.jpg");

class ViewSH extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header>
        <Left>
            <Button 
              transparent 
              onPress={() => this.props.navigation.navigate('Student')}
              // onPress={() => this.props.navigation.goBack()}
              >
              <Icon name="arrow-back" />
              <Text>Back</Text>
            </Button>
        </Left>
          <Body>
            <Title>Scavenger Hunt</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
        <Card style={styles.mb}>
            <CardItem bordered>
              <Left>
                <Body>
                    <Text>Take a picture of a tree</Text>
                    <Text note>April 15, 2016</Text>
                </Body>
                <Button bordered >
                      <Text>Camera</Text>
                </Button>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image
                  style={{
                    alignSelf: "center",
                    height: 250,
                    resizeMode: "cover",
                    width: deviceWidth / 1.18,
                    marginVertical: 5
                  }}
                  source={cardImage}
                />
              </Body>
            </CardItem>
          </Card>
          <Card style={styles.mb}>
            <CardItem bordered>
              <Left>
                <Body>
                  <Text>Describe your experience below</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Textarea 
                style={{width: deviceWidth/1.16}}
                rowSpan={5}
                // bordered 
                placeholder="Answer" />
              </Body>
            </CardItem>
          </Card>
        </Content>
        <Button
              block
              // style={{position: "absolute", bottom: 0}}
              onPress={() => this.props.navigation.navigate('')}
            >
              <Text>Submit</Text>
          </Button>
      </Container>
    );
  }
}

export default ViewSH;
