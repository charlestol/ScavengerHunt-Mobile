import React, { Component } from 'react';
import {Text, StyleSheet} from 'react-native';
import {Footer, Icon, Button, FooterTab } from 'native-base';

export default class AppFooter extends Component {
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
        <Footer>
        <FooterTab >
            <Button vertical>
            <Icon name="home" />
            <Text style={styles.whiteText}>Home</Text>
            </Button>
            <Button vertical>
            <Icon name="people" />
            <Text style={styles.whiteText}>User</Text>
            </Button>
        </FooterTab>
        </Footer>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    whiteText: {
        color: '#ffffff',
    }
});