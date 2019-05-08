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
  Picker
} from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";
import styles from "./styles";

const ItemPicker = Picker.Item;
class CreateSH extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      chosenDate: new Date(),
      selected2: undefined 
    };
    this.setDate = this.setDate.bind(this);
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
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
              <Row style={{height: 38, marginTop: 10}} >
                <Col> 
                  <H2 style={{paddingTop: 15}}>Question</H2>
                </Col>
                <Col style={{marginLeft: 100, height: 40}}>
                <Content >
                  <Form >
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="ios-arrow-down" />}
                      style={{ width: undefined }}
                      placeholder="Type"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.selected2}
                      onValueChange={this.onValueChange2.bind(this)}
                    >
                      <ItemPicker label="Text" value="key0" />
                      <ItemPicker label="Image" value="key1" />
                    </Picker>
                  </Form>
                </Content>
                </Col>
              </Row>
              <Row style={{height: 60}}>
                <Content>
                  <Form>
                    <Item>
                      <Input placeholder="Input question" />
                    </Item>
                  </Form>
                  
                  </Content>
              </Row>
              {/* Generate the code below when clicked "ADD MORE" */}

              {/* <Row style={{height: 38, marginTop: 10}} >
                <Col> 
                  <H2 style={{paddingTop: 15}}>Question</H2>
                </Col>
                <Col style={{marginLeft: 100, height: 40}}>
                <Content >
                  <Form >
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="ios-arrow-down" />}
                      style={{ width: undefined }}
                      placeholder="Type"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.selected2}
                      onValueChange={this.onValueChange2.bind(this)}
                    >
                      <ItemPicker label="Text" value="key0" />
                      <ItemPicker label="Image" value="key1" />
                    </Picker>
                  </Form>
                </Content>
                </Col>
              </Row>
              <Row style={{height: 60}}>
                <Content>
                  <Form>
                    <Item>
                      <Input placeholder="Input question" />
                    </Item>
                  </Form>
                  
                  </Content>
              </Row> */}
              <Row style={{height: 10, marginTop: 10, marginBottom:20}}>
                <Col>
                </Col>
                <Col style={{marginLeft: 170}}>
                <Button
                // block
                transparent
                // bordered
                >
                  <Text>Add more</Text>
                </Button>
                </Col>
                
              </Row>
              
              <Row style={{height: 115, marginTop: 20}}>
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
                    textStyle={{ color: "red" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={this.setDate}
                  />
                  <Text style={{marginLeft: 10}}>
                    Date: {this.state.chosenDate.toString().substr(4, 12)}
                  </Text>
                </Content>
              </Row>
              <Row></Row>
              <Button
                block
              > 
                <Text>Create Assignment</Text>
              </Button>
            </Col>
          </Grid>
        </Tab>
        <Tab heading="Review">
        <Content>
        </Content>
        </Tab>
      </Tabs>
      </Container>
    );
  }
}

export default CreateSH;
