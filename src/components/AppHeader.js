import React, { Component } from 'react';
import {Text, StyleSheet} from 'react-native';
import {Header, Body, Right, Title, Button} from 'native-base';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default class AppHeader extends Component {
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
        <Header style={styles.header}>
            <Body>
                <Title>Dasboard</Title>
            </Body>
            <Right>
            <Button transparent onPress={this.handleSignout}>
                <Text style={styles.whiteText}>Logout</Text>
            </Button>
            </Right>

            {/* <Button title="sign out" onPress={this.handleSignout}></Button>  */}

        </Header>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: getStatusBarHeight(),
        height: 54 + getStatusBarHeight(),
    },
    whiteText: {
        color: '#ffffff',
    }
});