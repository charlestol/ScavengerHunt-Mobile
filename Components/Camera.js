import React, {Component, Props} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Container, Content, Header, Item, Icon, Button, Input, CameraRoll} from 'native-base';
import {Camera, Permissions, MediaLibrary} from 'expo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


class CameraComponent extends Component {
    takePicture = async () => {   // added "async" here  
        try {
            const data = await this.camera.takePictureAsync();
            this.setState({ image: data.uri });
            console.log('Path to image: ' + data.uri);
            //console.log(data);
        } 
        catch (err) {
            console.log('err: ', err);
        }
    }

   
    state = {
          hasCameraPermission: null,
          hasLibraryPermission:null,
          type: Camera.Constants.Type.back,
          image: null,
      }
      async componentWillMount(){
          const {status} = await Permissions.askAsync(Permissions.CAMERA);
          this.setState({hasCameraPermission: status === 'granted'})
          const{statusLib} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          this.setState({hasLibraryPermission: statusLib === 'granted'})
      }

  render() {   
    const {hasCameraPermission} = this.state
   

    if(hasCameraPermission === null){
        return <View />
    }
    
    else if(hasCameraPermission === false){
        return <Text> No access to camera </Text>
    } 
    
    else if(this.state.image){
        return (
            <View style = {{justifyContent: 'space-around', backgroundColor:"transparent"}}>
                <Image 
                style={{width: '100%', height: '100%'}}
                source={{uri:this.state.image}}/>

                <Icon 
                    onPress = {
                        ()=>this.setState({image: null})
                    }
                    name = "md-close-circle"
                    style = {{color: "white", fontSize: 35, backgroundColor: "transparent", fontWeight: "bold", position: 'absolute', paddingHorizontal: 10, paddingTop: 20}}/>
            </View>
        )
    }
    
    else{
        return(
            <View style = {{flex:1}}>
                <Camera style = {{flex: 1, justifyContent: 'space-between'}} type = {this.state.type}
                    ref = {ref => {this.camera = ref;}}    
                >
                
                    <Header searchBar rounded
                        style = {{position: 'absolute', backgroundColor: 'transparent',
                        left: 0, top:0, right: 0, zIndex:100, alignItems: 'center'}}
                    >
                        <View style = {{flexDirection: 'row', flex: 2, justifyContent: 'space-around'}}>
                            
                            <Icon name = "ios-flash" style = {{color: 'white', fontWeight: 'bold'}}/>
                            <Icon 
                            onPress={()=>{
                                this.setState({
                                    type: this.state.type === 
                                    Camera.Constants.Type.back?
                                    Camera.Constants.Type.front:
                                    Camera.Constants.Type.back
                                })
                            }}
                            name = "ios-reverse-camera" style = {{color: 'white', fontWeight: 'bold'}}/>
                            
                        </View>
                    </Header>
                    <View 
                        style ={{flexDirection: 'row', justifyContent: 'space-between', 
                        paddingHorizontal: 10, marginBottom: 15,
                        alignItems: 'flex-end'}}
                    >

                        <View style = {{alignItems: 'center'}}>
                            <Icon 
                                onPress= {
                                    this.takePicture
                                }
                            
                                name = "md-radio-button-off" 
                                style={{color:'white', fontSize:100}} />

                            <Icon name="ios-images" style = {{color: 'white', fontSize: 36}}/>
                           
                        </View>
                        
                    </View>
                    
                </Camera>
                
            </View>
        )
        
    }

  }

}
export default CameraComponent


