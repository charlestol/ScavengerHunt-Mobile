import React, { Component, Props } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { Container, Content, Header, Item, Icon, Button, Input, CameraRoll } from 'native-base';
import { Camera, Permissions, MediaLibrary } from 'expo';
import DisplayImage from './DisplayImage';



class CameraComponent extends Component {
    takePicture = async () => { 
    this.setState({imageTaken:true}, ()=>console.log("set"))
        try {
            const data = await this.camera.takePictureAsync();
            this.setState({ 
                image: data.uri, 
                imageTaken:false 
            });
            console.log('Path to image: ' + data.uri);
        }
        catch (err) {
            console.log('err: ', err);
        }
    }

    


    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        image: null,
        imageTaken:false,
    }
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' })
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                {!this.state.hasCameraPermission && (
                    <Text> No access to camera </Text>
                )}
                {/* {this.state.imageTaken && (
                    <Text> Loading.. </Text>
                )} */}
                {this.state.image && (
                    <DisplayImage
                        image={this.state.image}
                        setImage={(newImage) => this.setState({ image: newImage })} />
                )}

                {!this.state.image && this.state.hasCameraPermission  && (
                    <Camera style={{ flex: 1, justifyContent: 'space-between' }} type={this.state.type}
                        ref={ref => { this.camera = ref; }}
                    >

                        <Header searchBar rounded
                            style={{
                                position: 'absolute', backgroundColor: 'transparent',
                                left: 0, top: 0, right: 0, zIndex: 100, alignItems: 'center'
                            }}
                        >

                            <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-around' }}>

                                <Icon name="ios-flash" style={{ color: 'white', fontWeight: 'bold' }} />
                                <TouchableOpacity onPress={() => { this.setState({
                                                                        type: this.state.type ===
                                                                        Camera.Constants.Type.back ?
                                                                        Camera.Constants.Type.front :
                                                                        Camera.Constants.Type.back}) }}>
                                     <Icon
                                        name="ios-reverse-camera" 
                                        style={{ color: 'white', fontWeight: 'bold' }} />
                                </TouchableOpacity>
                               

                            </View>
                        </Header>
                        <View
                            style={{
                                flexDirection: 'row', justifyContent: 'space-between',
                                paddingHorizontal: 10, marginBottom: 15,
                                alignItems: 'flex-end'
                            }}
                        >


                            <View style={{position: 'absolute', backgroundColor: 'transparent',
                                left: 0, right: 0, alignItems: 'center' }}>
                                <TouchableOpacity onPress={this.takePicture.bind(this)} >
                                    <Icon
                                        name="md-radio-button-off"
                                        style={{ color: 'white', fontSize: 100, }}
                                        
                                        />
                                </TouchableOpacity>


                            </View>

                        </View>

                    </Camera>

                )}
            </View>
        )

    }

}

//}
export default CameraComponent


