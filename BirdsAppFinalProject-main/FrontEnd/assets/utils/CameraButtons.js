import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { cameraStyle } from '../AppStyles';

export default function CamButton({ title, onPress, icon, color }) {
  return (
    <TouchableOpacity onPress={onPress} style={cameraStyle.in_buttons}>
      <Entypo name={icon} size={28} color={color ? color : '#f1f1f1'} />
      <Text style={cameraStyle.in_text} onPress={onPress}>{title}</Text>
    </TouchableOpacity>
  );
}