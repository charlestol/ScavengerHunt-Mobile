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
      marginTop: 50,
      marginRight: 50,
      marginLeft: 50
    },
    signupBtn: {
      marginTop: 15,
      marginRight: 50,
      marginLeft: 50
    },
    forgotBtn: {
      marginTop: 200,
      marginRight: 50,
      marginLeft: 50
    }
  };
