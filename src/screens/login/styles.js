import {Dimensions } from "react-native";
const deviceWidth = Dimensions.get("window").width;

export default {
    container: {
      backgroundColor: "#FFF",
    },
    content: {
      // alignSelf: "center",
      // width: deviceWidth / 1.10,
    },
    loginBtn: {
      margin: 15, 
      marginTop: 50
    },
    signupBtn: {
      margin: 15, 
      marginTop: 15
    }

  };