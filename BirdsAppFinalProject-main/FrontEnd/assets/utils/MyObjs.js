import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";

class User  {
  constructor(username, first_name, last_name, password, email, user_type) {
  this.username = username;
  this.first_name = first_name;
  this.last_name = last_name;
  this.password = password;
  this.email = email;
  this.user_type = user_type;
  }
};

export const BirdInfo = (props) => {
  id: props.bird_id;
  name: props.name;
  family: props.family;
  img_path: props.img_path;
  info: props.info;
};

export { User };