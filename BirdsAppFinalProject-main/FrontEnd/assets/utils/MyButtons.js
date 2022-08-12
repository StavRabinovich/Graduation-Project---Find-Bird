import * as React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import { touchableOpacityStyle, buttons } from '../AppStyles';


const MyButton = ({ title, style, onPress }) => {
  return (
    <TouchableOpacity
    style={style}
    onPress={() => onPress}
  >
    <Text style={buttons.text}>{title}</Text>
  </TouchableOpacity>
  );
}

export default MyButton;