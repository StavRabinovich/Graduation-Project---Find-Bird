import React, { useState } from "react";
import {StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, FlatList} from 'react-native';
import {customStyles, buttons, pickerStyle, textStyle, touchableOpacityStyle, imgStyle} from '../AppStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import { BirdInfo } from "./MyObjs";

// BirdInfo
const BirdCard = (props) => {
  return (
    <View style={customStyles.container}>
      <View style={customStyles.bird_container}>
        <View>
          <Text style={textStyle.id_header1}>{props.name}</Text>
          <Text style={textStyle.id_header2}>{props.family}</Text>
        </View>
        <View>
          <Image style={[imgStyle.small, {}]} source={require('../../assets/sqlogo_white.png')}/>
        </View>
      </View>        
      <Text style={textStyle.id_text}>{props.info}</Text>
      <TouchableOpacity
      style={touchableOpacityStyle.default}
      >
        <Text style={buttons.text}>Find bird on map</Text>
      </TouchableOpacity>
    </View>
  );
}
export default BirdCard;