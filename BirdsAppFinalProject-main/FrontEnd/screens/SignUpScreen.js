import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/action";
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
  pickerStyle,
} from "../assets/AppStyles";
import { Picker } from "@react-native-picker/picker";
import { addNewUser } from "../requests/UserRequests";
import { User } from "../assets/utils/MyObjs";

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [selectedValue, setSelectedValue] = useState(1);
  const dispatch = useDispatch();
  // TODO : As useState
  const msgUsername = "";
  const msgFirstName = "";
  const msgLastName = "";
  const msgPassword = "";
  const msgEmail = "";



  function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const cleanFilled = () => {
    msgUsername = "";
    msgFirstName = "";
    msgLastName = "";
    msgPassword = "";
    msgEmail = "";
  }

  const checkSigned = async(user) => {
    cleanFilled();
    const filledOk = true;
    if (user.username === null || user.username === ""){
      msgUsername = "Username can't be null";
      filledOk = false;
    }
    else if (user.username.length < 4 || user.username.length > 16 ){
      msgUsername = "Username must have 4 to 16 chars";
      filledOk = false;
    }
    if (user.firstName === null || user.firstName === ""){
      msgFirstName = "First name can't be null";
      filledOk = false;
    }
    else if (user.firstName.length < 2 || user.firstName.length > 16 ){
      msgFirstName = "First name must have 2 to 16 chars";
      filledOk = false;
    }
    if (user.lastName === null || user.lastName === ""){
      msgLastName = "Last name can't be null";
      filledOk = false;
    }
    else if (user.lastName.length < 2 || user.lastName.length > 16 ){
      msgLastName = "Last name must have 2 to 16 chars";
      filledOk = false;
    }
    if (user.password === null || user.password === ""){
      msgPassword = "Password can't be null";
      filledOk = false;
    }
    else if (user.password.length < 4 || user.password.length > 16 ){
      msgPassword = "Password must have 4 to 16 chars";
      filledOk = false;
    }
    if (user.email === null || user.email === ""){
      msgEmail = "Email can't be null";
      filledOk = false;
    }
    else if (!emailIsValid(user.email) ){
      msgEmail = "Invalid Email";
      filledOk = false;
    }

    return filledOk;
  }

  const signUp = async () => {
    const user = new User(
      username,
      firstName,
      lastName,
      password,
      email,
      selectedValue
    );
    if (checkSigned(user)){
      console.log(user);
      const res = await addNewUser(user);
      console.log(`status: ${res.status}`);
  
      if (res.status === 201) {
        console.log("Success");
        const body = await JSON.parse(await JSON.stringify(await res.json()));
        console.log(
          `username = ${body.username}\t user_type = ${body.user_type}`
        );
        dispatch(signIn(body.username, body.user_type));
        Alert.alert(
          "Success",
          "User created successfully",
          navigation.navigate("Main")
        );
      } else {
        const body = await res.json();
        console.log(body.message);
        Alert.alert("Problem!", body.message);
      }
    }
  };

  return (
    <SafeAreaView style={customStyles.container}>
      <ScrollView>
        <View style={imgStyle.main_image}>
          <Text style={textStyle.h1}>SignUp</Text>
        </View>
        <View>
          <View style={textInputStyle.view}>
            <View flexDirection="row">
              <Text style={textStyle.default}>Username: </Text>
              <Text style={textStyle.error}>{msgUsername} </Text>
            </View>
            <TextInput
              style={textInputStyle.default}
              selectedValue={username}
              onChangeText={(newText) => setUsername(newText)}
            />
          </View>
          <View style={textInputStyle.view}>
            <View flexDirection="row">
              <Text style={textStyle.default}>First Name: </Text>
              <Text style={textStyle.error}>{msgFirstName} </Text>
            </View>
            <TextInput
              style={textInputStyle.default}
              onChangeText={(newText) => setFirstName(newText)}
            />
          </View>
          <View style={textInputStyle.view}>
            <View flexDirection="row">
              <Text style={textStyle.default}>Last Name: </Text>
              <Text style={textStyle.error}>{msgLastName} </Text>
            </View>
            <TextInput
              style={textInputStyle.default}
              onChangeText={(newText) => setLastName(newText)}
            />
          </View>
          <View style={textInputStyle.view}>
            <View flexDirection="row">
              <Text style={textStyle.default}>Email: </Text>
              <Text style={textStyle.error}>{msgEmail} </Text>
            </View>
            <TextInput
              style={textInputStyle.default}
              onChangeText={(newText) => setEmail(newText)}
            />
          </View>
          <View style={textInputStyle.view}>
            <View flexDirection="row">
              <Text style={textStyle.default}>Password: </Text>
              <Text style={textStyle.error}>{msgPassword} </Text>
            </View>
            <TextInput
              style={textInputStyle.default}
              onChangeText={(newText) => setPassword(newText)}
            />
          </View>
          <View style={textInputStyle.view}>
            <View
              flexDirection="row"
              style={"alignItems: center, alignSelf: center,"}
            >
              <Text style={textStyle.default}>Role: </Text>

              <Picker
                selectedValue={selectedValue}
                style={pickerStyle.item}
                itemStyle={pickerStyle.default}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
              >
                <Picker.Item label="Hobby" value="0" />
                <Picker.Item label="Birdwatcher" value="1" />
                <Picker.Item label="Admin" value="2" />
              </Picker>
            </View>
          </View>
        </View>
        <View style={buttons.main_buttons}>
          <TouchableOpacity
            style={touchableOpacityStyle.default}
            onPress={() => signUp()}
          >
            <Text style={buttons.text}>Sign Me Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignUpScreen;
