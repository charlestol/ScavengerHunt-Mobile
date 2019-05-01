import React from 'react';
// import {
//   ActivityIndicator,
//   Button,
//   Clipboard,
//   Image,
//   Share,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Alert,
//   View,
// } from 'react-native';
import {
  ActivityIndicator,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';
import {
  Container,
  Content,
  Header,
  Title,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  H1,
  Form,
  Item,
  Label,
  Input,
  // View,
  Badge,
  Tab,
  Tabs,
  List,
  ListItem
} from "native-base";
import { Constants, ImagePicker, Permissions } from 'expo';
import uuid from 'uuid';
import * as firebase from 'firebase';
import { withNavigation } from 'react-navigation'
require('../../config')
const db = firebase.firestore()

console.disableYellowBox = true;

const SUCCESS_MSG = "Submitted!"
const ERROR_MSG = "Error, try submitting again."

const url =
  'https://firebasestorage.googleapis.com/v0/b/blobtest-36ff6.appspot.com/o/Obsidian.jar?alt=media&token=93154b97-8bd9-46e3-a51f-67be47a4628a';

// 
class SubmitImage extends React.Component {
    state = {
      image: null,
      uploading: false,
    };
    
    async componentDidMount() {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      await Permissions.askAsync(Permissions.CAMERA);
    }
  
    render() {
      let { image } = this.state;
      let ac = this.props.navigation.state.params.ac
      let taskName = this.props.navigation.state.params.task
  
      return (


        <Container>
        <Header>
            <Left>
            <Button 
            transparent 
            onPress={() => {
              this.props.navigation.navigate('STaskItem', {
                  accessCode: ac,
                  taskName: taskName
              })
            }}
            >
            <Icon name="arrow-back" />
            </Button>
        </Left>
        <Body>
        <Title>Image Submission</Title>
        </Body>
        <Right>
        </Right>
    </Header>

    <Content style={{margin: 10}} >
          {image ? null : (
            <Text
              style={{
                fontSize: 20,
                marginBottom: 20,
                textAlign: 'center',
                marginHorizontal: 15,
              }}>
              Example: Upload ImagePicker result
            </Text>
          )}
  
          <Button
            style={{marginBottom: 10}}
            block
            onPress={this._pickImage}
            // title="Pick an image from camera roll"
          > 
          <Text>
            Upload a Picture
          </Text>
          </Button>
  
          <Button 
            style={{marginBottom: 10}}
            block
            onPress={this._takePhoto} 
            // title="Take a photo" 
            > 
            <Text>
              Take a Picture   
            </Text> 
          </Button>
  
          {this._maybeRenderImage()}
          {this._maybeRenderUploadingOverlay()}
  
          <StatusBar barStyle="default" />
          {/* <Button
            title={"back"}
            onPress={() => {
              this.props.navigation.navigate('STaskItem', {
                  accessCode: ac,
                  taskName: taskName
              })
            }}
          /> */}
        </Content>

    <Footer>
        <FooterTab>
        <Button
        onPress={() => this.props.navigation.navigate('DashboardS')}
        >
            <Icon  name="home" />
            <Text>Home</Text>
        </Button>
        <Button 
            onPress={() => this.props.navigation.navigate('ProfileS')}
        >
            <Icon name="person" />
            <Text>Profile</Text>
        </Button>
        </FooterTab>
    </Footer>
    </Container>
        



        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //   {image ? null : (
        //     <Text
        //       style={{
        //         fontSize: 20,
        //         marginBottom: 20,
        //         textAlign: 'center',
        //         marginHorizontal: 15,
        //       }}>
        //       Example: Upload ImagePicker result
        //     </Text>
        //   )}
  
        //   <Button
        //     onPress={this._pickImage}
        //     title="Pick an image from camera roll"
        //   />
  
        //   <Button onPress={this._takePhoto} title="Take a photo" />
  
        //   {this._maybeRenderImage()}
        //   {this._maybeRenderUploadingOverlay()}
  
        //   <StatusBar barStyle="default" />
        //   <Button
        //     title={"back"}
        //     onPress={() => {
        //       this.props.navigation.navigate('STaskItem', {
        //           accessCode: ac,
        //           taskName: taskName
        //       })
        //     }}
        //   />
        // </View>
      );
    }
  
    _maybeRenderUploadingOverlay = () => {
      if (this.state.uploading) {
        return (
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: 'rgba(0,0,0,0.4)',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <ActivityIndicator color="#fff" animating size="large" />
          </View>
        );
      }
    };
  
    _maybeRenderImage = () => {
      let { image } = this.state;
      if (!image) {
        return;
      }
  
      return (
        <View
          style={{
            marginTop: 30,
            width: 250,
            borderRadius: 3,
            elevation: 2,
          }}>
          <View
            style={{
              borderTopRightRadius: 3,
              borderTopLeftRadius: 3,
              shadowColor: 'rgba(0,0,0,1)',
              shadowOpacity: 0.2,
              shadowOffset: { width: 4, height: 4 },
              shadowRadius: 5,
              overflow: 'hidden',
            }}>
            <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
          </View>
  
          <Text
            onPress={this._copyToClipboard}
            onLongPress={this._share}
            style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
            {image}
          </Text>
        </View>
      );
    };
  
    _share = () => {
      Share.share({
        message: this.state.image,
        title: 'Check out this photo',
        url: this.state.image,
      });
    };
  
    _copyToClipboard = () => {
      Clipboard.setString(this.state.image);
      alert('Copied image URL to clipboard');
    };
  
    _takePhoto = async () => {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
  
      this._handleImagePicked(pickerResult);
    };
  
    _pickImage = async () => {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
  
      this._handleImagePicked(pickerResult);
    };
  
    _handleImagePicked = async pickerResult => {
      try {
        this.setState({ uploading: true });
  
        if (!pickerResult.cancelled) {
          let task = this.props.navigation.state.params.task
          let ac = this.props.navigation.state.params.ac
          uploadUrl = await uploadImageAsync(pickerResult.uri, ac, task);
          this.setState({ image: uploadUrl });
        }
      } catch (e) {
        console.log(e);
        alert('Upload failed, sorry :(');
      } finally {
        this.setState({ uploading: false });
      }
    };
  }
  
  export default withNavigation(SubmitImage)

  async function uploadImageAsync(uri, ac, task) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  
    const ref = firebase
      .storage()
      .ref()
      .child(`${ac}/${task}/${uuid.v4()}`);
    const snapshot = await ref.put(blob);
    firebase.auth().onAuthStateChanged(user => {
        if(user === null) {
          return;
        }  
        db.doc(`users/${user.email}`).get()
        .then(doc => {
            let user = doc.data();
            ref.getDownloadURL()
            .then(imageURL => {
                const submitData = {
                    email: user.email,
                    name: `${user.firstName} ${user.lastName}`,
                    studentID: user.studentID,
                    taskName: task,
                    imageURL: imageURL
                }
                // save data in a task's submission collection
                db.doc(`scavengerHunts/${ac}`).collection('members').doc(user.email).collection('submissions').doc(task).set(submitData)
                .then(() => {
                    // console.log("Submission Successful!");
                    Alert.alert(SUCCESS_MSG)
                })
                .catch(function(error) {
                    // console.error("Error writing document: ", error);
                    Alert.alert(ERROR_MSG)
                })
            })
        })
    })
    // We're done with the blob, close and release it
    blob.close();
  
    return await snapshot.ref.getDownloadURL();
  }
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center'
//     }
//   })
