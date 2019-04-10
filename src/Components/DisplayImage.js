import React, { Component, Props } from 'react';
import { View, Image, Alert, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { Icon } from 'native-base';
import uuid from 'uuid';
import firebase from 'firebase';
import 'firebase/firestore'

require('../config')
const db = firebase.firestore();



class DisplayImage extends Component {


    uploadImage = async () => {
        Alert.alert(
            'Upload!',
            'Still needs to be implemented',
            [{text: 'OK', onPress: () => {console.log('OK Pressed'); this.props.setImage(null)}, style: 'cancel'}],
            
        );
        console.log('PRESSED')
    
       
    }


    render() {
        return (

            <View style={{ justifyContent: 'space-around', backgroundColor: "transparent" }}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={{ uri: this.props.image }} />

                <Icon
                    onPress={
                        () => { console.log("huhuhuh"); this.props.setImage(null) }
                    }
                    name="md-close-circle"
                    style={{
                        color: "white", fontSize: 35, backgroundColor: "transparent",
                        fontWeight: "bold", position: 'absolute', marginHorizontal: 10, marginTop: 20
                    }} />

                <Icon
                    onPress={this.uploadImage.bind(this)}
                    name="send"
                    style={{
                        color: "white", fontSize: 45, backgroundColor: "transparent",
                        fontWeight: "bold", position: 'absolute', right: 20, bottom: 10
                    }}
                />
            </View>
        )
    }


}
export default DisplayImage

const alertStyle = StyleSheet.create({
    button: {
        backgroundColor: '#4ba37b',
        width: 100,
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 100,
        position: 'absolute'
    }
});


