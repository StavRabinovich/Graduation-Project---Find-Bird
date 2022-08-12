import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  customStyles,
  buttons,
  touchableOpacityStyle,
  textStyle,
} from "../assets/AppStyles";
import { getUser } from "../requests/UserRequests";

export default ProfileScreen = ({ navigation }) => {
  const [email, setEmail] = useState(" ");
  const [role, setRole] = useState(null);
  const [firstName, setFirstName] = useState(" ");
  const [lastName, setLastName] = useState(" ");
  const [username, setUsername] = useState(" ");
  const currentUser = useSelector((state) => state.username);
  

  async function setUserData() {
    console.log(`current_user = ${currentUser}`);
    let user = await getUser(currentUser);
    user = await JSON.parse(await JSON.stringify(await user.json()));
    console.log(`User = ${user}`);
    setRole(user.user_type);
    setEmail(user.email);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setUsername(user.username);
  }

  useEffect(() => {
    setUserData();
  });

  return (
    <ScrollView style={customStyles.container}>
      <Text style={textStyle.h1}>Profile</Text>
      <View>
        <Text style={textStyle.h2}>{`${firstName} ${lastName}`}</Text>
        <Text style={textStyle.h3}>{username}</Text>
        <Text style={textStyle.default}>{`Email:\t ${email}`}</Text>
        <Text style={textStyle.default}>{`Role:\t ${role}`}</Text>
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
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={buttons.text}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={touchableOpacityStyle.default}>
          <Text style={buttons.text}>My Birds</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
