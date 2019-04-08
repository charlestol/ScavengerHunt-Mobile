import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {Content, Button, Container, View} from 'native-base';
import SearchEvent from '../components/SearchEvent';
import UserEventHistory from '../components/UserEventHistory';

export default class AppBody extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }
    
    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        });
        this.setState({ loading: false });
    }
render() {
    if (this.state.loading) {
        return <Expo.AppLoading />;
    }
    return (
        <Content  style={styles.body}>
            <SearchEvent/>
            <UserEventHistory/>
            <Button title="sign out" onPress={this.handleSignout}></Button> 
        </Content>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 10,
    }
})