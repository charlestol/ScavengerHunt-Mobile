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
  Tab,
  Tabs,
  DatePicker,
  Form,
  Item,
  Input,
  H2,
} from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";
import styles from "./styles";

class CreateSH extends Component {
  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };

    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
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
        <Tabs>
        <Tab heading="Setup">
          <Grid style={{marginRight: 15, marginLeft: 15, marginTop: 25, marginBottom: 25}}>
            <Col> 
              <Row style={{height: 80}}>
              <Content>
                <H2 >Assignment Name</H2>
                <Form>
                  <Item>
                  <Input placeholder="Input assignment name" />
                  </Item>
                </Form>
              </Content>
              </Row>
              <Row style={{height: 30, marginTop: 25}} >
                <Col> 
                  <H2>Question</H2>
                </Col>
                <Col style={{marginLeft: 100}}>
                  <H2>Type</H2>
                </Col>
              </Row>
              <Row style={{height: 50}}>
                <Content>
                  <Form>
                    <Item>
                      <Input placeholder="Input question" />
                    </Item>
                  </Form>
                  </Content>
              </Row>
              <Row style={{height: 100, marginTop: 25}}>
                <Content>
                  <H2>Due Date</H2>
                  <DatePicker
                    defaultDate={new Date(2019, 1, 1)}
                    minimumDate={new Date(2019, 1, 1)}
                    maximumDate={new Date(2019, 12, 31)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Select date"
                    textStyle={{ color: "green" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={this.setDate}
                  />
                  <Text style={{marginLeft: 10}}>
                    Date: {this.state.chosenDate.toString().substr(4, 12)}
                  </Text>
                </Content>
              </Row>
            </Col>
          </Grid>
        </Tab>
        <Tab heading="Review">
        <Content></Content>
        </Tab>
      </Tabs>
      </Container>
    );
  }
}

export default CreateSH;
