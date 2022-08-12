import React from "react";

import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import {
  customStyles,
  buttons,
  touchableOpacityStyle,
  imgStyle,
} from "../assets/AppStyles";

export default HomeScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={customStyles.middle_container}>
      <View style={imgStyle.view}>
        <Image
          style={imgStyle.default}
          source={require("../assets/sqlogo_white.png")}
        />
      </View>
      <View style={[buttons.view, { marginTop: 30 }]}>
        <TouchableOpacity
          style={touchableOpacityStyle.default}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={buttons.text}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={touchableOpacityStyle.default}
          onPress={() => navigation.navigate("LogIn")}
        >
          <Text style={buttons.text}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={touchableOpacityStyle.default}
          onPress={() => navigation.navigate("Main")}
        >
          <Text style={buttons.text}>Remind me later</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
