import React, { Component } from 'react'; 
// import { View, Text, TextInput, Alert, Button, StyleSheet, Image} from 'react-native'
import { View, StyleSheet, TextInput, Alert, Image } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  ListItem,
  List,
  H1,
  H2
} from "native-base";

import { withNavigation } from 'react-navigation'
import firebase from 'firebase/app'
import 'firebase/firestore'
require('../../config')
const db = firebase.firestore()

export default class ViewSubmission extends Component {
    state = { type: '', submission: null}

    componentDidMount() {
        let ac = this.props.ac
        let task = this.props.task
        firebase.auth().onAuthStateChanged(user => {
            if(user === null) {
                return
            }  
            db.doc(`scavengerHunts/${ac}`).collection('members').doc(user.email).collection('submissions').doc(task).get()
            .then(doc => {
                if(doc.exists) {
                    let submitData = doc.data();
                    let submission = '';
                    let type = '';
                // console.log('sub ',doc.data())
                    if(submitData.hasOwnProperty('textEntry')) {
                        type = 'text';
                        submission = submitData.textEntry;
                    } else if(submitData.hasOwnProperty('imageURL')) {
                        type = 'image';
                        submission = submitData.imageURL;
                    } 
                
                    this.setState({
                        type,
                        submission,
                    });
                }
            })
        })
    }
    //   componentWillUnmount() {
    //       this.unsubscribe();
    //   }

    render() {
        const { type, submission} = this.state;

        return ( 

            <Content style={{marginTop: 40}}>
                {submission && 
                    <View>
                        <H2 style={{color: "red"}}>Submission</H2>
                        {type==='image' && 
                            <View 
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            >
                                <Image source={{uri: submission}} style={{ height: 400, width:400}} />
                            </View>
                        }
                        {type==='text' && 
                            <View>
                                <Text>{submission}</Text>
                            </View>
                        }
                    </View>
                }
            </Content>

            // <View>
            //     {submission && 
            //         <View>
            //             <Text>Submission</Text>
            //             {type==='image' && 
            //                 <View>
            //                     <Image source={{uri: submission}} style={{ height: 100, width:100}} />
            //                 </View>
            //             }
            //             {type==='text' && 
            //                 <View>
            //                     <Text>{submission}</Text>
            //                 </View>
            //             }
            //         </View>
            //     }
            // </View>
        )
    }
}