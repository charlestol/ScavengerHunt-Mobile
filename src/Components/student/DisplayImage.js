import React, { Component, Props } from 'react';
import { View, Image, Alert, StyleSheet, TouchableOpacity, Text, } from 'react-native';
import { Icon, Button } from 'react-native-elements'
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
            [{ text: 'OK', onPress: () => { console.log('OK Pressed'); this.props.setImage(null) }, style: 'cancel' }],

        );
        console.log('PRESSED')

    }

    render() {
        return (

            <View style={{ justifyContent: 'space-around', backgroundColor: "transparent" }}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={{ uri: this.props.image }} />


                <Button
                    type="clear"
                    containerStyle={{ alignItems: 'flex-start', position: 'absolute', top: 30, left: 5 }}

                    icon={
                        <Icon
                            raised
                            reverse
                            name="x"
                            type="octicon"
                            color="red"
                            size={15}

                            iconStyle={{ alignContent: 'center', alignItems: 'center', fontSize: 20, justifyContent: 'center', }}
                        />
                    }

                    onPress={
                        () => { console.log("exit"); this.props.setImage(null) }
                    }

                />

                <Button

                    containerStyle={{ alignItems: 'flex-end', position: 'absolute', bottom: 10, right: 10 }}
                    type = "clear"
                    icon={
                        <Icon
                            reverse
                            raised
                            name="upload"
                            type="feather"
                            color='#72e2ff'
                        />
                    }

                    onPress={this.uploadImage.bind(this)}

                />

            </View>
        )
    }


}
export default DisplayImage