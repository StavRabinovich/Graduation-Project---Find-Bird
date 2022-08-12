import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../requests/UserRequests";
import { Picker } from "@react-native-picker/picker";
import { signIn } from "../redux/action";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import {
  customStyles,
  buttons,
  touchableOpacityStyle,
  textStyle,
  textInputStyle,
  pickerStyle,
} from "../assets/AppStyles";
import { User } from "../assets/utils/MyObjs";

const EditProfileScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(" ");
  const [username, setUsername] = useState(" ");
  const [password, setPassword] = useState("");
  const [selectedValue, setSelectedValue] = useState(1);
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.username);

  const setUserData = async () => {
    let user = await getUser(currentUser);
    user = await JSON.parse(await JSON.stringify(await user.json()));
    console.log(`current_user = ${await JSON.stringify(user)}`);
    const value = user.user_type;
    console.log(`value = ${value} value = ${user.user_type}`);
    setSelectedValue(value);
    setEmail(user.email);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setUsername(user.username);
    setPassword(user.password);
  };

  const profileUpdate = async () => {
    const updated_user = new User(
      username,
      firstName,
      lastName,
      password,
      email,
      selectedValue
    );
    console.log(updated_user);
    const res = await updateUser(updated_user);
    console.log(`status: ${res.status}`);

    if (res.status === 200) {
      console.log("Success");
      let body = await JSON.parse(await JSON.stringify(await res.json()));
      console.log(body);
      console.log(
        `username = ${body.username}\t user_type = ${body.user_type}`
      );
      dispatch(signIn(body.username, body.user_type));
      await setUserData();
      Alert.alert("Success", "User updated successfully");
      navigation.navigate("Main");
    } else {
      const body = await res.json();
      console.log(body.message);
      await setUserData();
      Alert.alert("Problem!", body.message);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setUserData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={customStyles.container}>
      <Text style={textStyle.h1}>Profile</Text>
      <View>
        <View style={textInputStyle.view}>
          <Text style={textStyle.default}> Username: </Text>
          <TextInput style={textInputStyle.default} value={username} />
        </View>
        <View style={textInputStyle.view}>
          <Text style={textStyle.default}> First Name: </Text>
          <TextInput
            style={textInputStyle.default}
            value={firstName}
            onChangeText={(newText) => setFirstName(newText)}
          />
        </View>
        <View style={textInputStyle.view}>
          <Text style={textStyle.default}> Last Name: </Text>
          <TextInput
            style={textInputStyle.default}
            value={lastName}
            onChangeText={(newText) => setLastName(newText)}
          />
        </View>
        <View style={textInputStyle.view}>
          <Text style={textStyle.default}> Email: </Text>
          <TextInput
            style={textInputStyle.default}
            value={email}
            onChangeText={(newText) => setEmail(newText)}
          />
        </View>
        <View style={textInputStyle.view}>
          <Text style={textStyle.default}> Password: </Text>
          <TextInput
            style={textInputStyle.default}
            secureTextEntry={true}
            value={password}
            onChangeText={(newText) => setPassword(newText)}
          />
        </View>
        <Text style={textStyle.default}>Role: </Text>
        <Picker
          style={pickerStyle.item}
          itemStyle={pickerStyle.default}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          selectedValue={String(selectedValue)}
        >
          <Picker.Item label="Hobby" value="0" />
          <Picker.Item label="Birdwatcher" value="1" />
          <Picker.Item label="Admin" value="2" />
        </Picker>
      </View>
      <View
        style={[
          buttons.in_view,
          {
            marginTop: 30,
            flexDirection: "column",
            justifyContent: "space-between",
          },
        ]}
      >
        <TouchableOpacity
          style={touchableOpacityStyle.default}
          onPress={() => profileUpdate()}
        >
          <Text style={buttons.text}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default EditProfileScreen;
