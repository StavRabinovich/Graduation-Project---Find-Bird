import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import {
  customStyles,
  buttons,
  touchableOpacityStyle,
  imgStyle,
  textStyle,
  textInputStyle,
} from "../assets/AppStyles";
import { signIn } from "../redux/action";
import { login } from "../requests/UserRequests";

const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (username === null || username === "") {
      Alert.alert("Username required. \nPlease enter username");
      setPassword("");

    }
    else {
      const res = await login(username, password);
      console.log(`login status= ${res.status}`);
      const body = await JSON.parse(await JSON.stringify(await res.json()));
      if (res.status === 200) {
        console.log(`User ${body.username} logged in`);
        dispatch(signIn(body.username, body.user_type));
  
        navigation.navigate("Main");
      } else {
        Alert.alert("Problem!", "Username or password are incorrect");
        setPassword("");
      }
    }

  };

  return (
    <SafeAreaView style={customStyles.container}>
      <ScrollView>
        <View style={imgStyle.main_image}>
          <Text style={textStyle.h1}>Log In</Text>
        </View>
        <View>
          <View style={textInputStyle.view}>
            <Text style={textStyle.default}> Username: </Text>
            <TextInput
              style={textInputStyle.default}
              value={username}
              onChangeText={(newText) => setUsername(newText)}
            />
          </View>
          <View style={textInputStyle.view}>
            <Text style={textStyle.default} secureTextEntry={true}>
              {" "}
              Password:{" "}
            </Text>
            <TextInput
              style={textInputStyle.default}
              secureTextEntry={true}
              value={password}
              onChangeText={(newText) => setPassword(newText)}
            />
          </View>
        </View>
        <View style={[buttons.main_buttons, { marginTop: 30 }]}>
          <TouchableOpacity
            style={touchableOpacityStyle.default}
            onPress={() => handleLogin()}
          >
            <Text style={buttons.text}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
