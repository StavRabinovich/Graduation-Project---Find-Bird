import React, { useState } from "react";

import {StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Image, Picker, ScrollView} from 'react-native';
import {customStyles, buttons, touchableOpacityStyle, textStyle, textInputStyle,  pickerStyle, imgStyle} from "../assets/AppStyles";


export default function ApproveScreen({ navigation }) {
  const [birdName, setBirdName] = useState("Bird Name");
  const [birdFamily, setBirdFamily] = useState("Bird Name");
  return (
    <View style={customStyles.container}>
      <ScrollView>
        {/* The item*/}
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' , alignItems: 'center',}}>
            <Image style={imgStyle.mini} source={require('../assets/sqlogo_white.png')}/>
            <View>
              <TextInput
                style={textInputStyle.mini}
                onChangeText={(newText) => setBirdName(newText)}
                defaultValue='Bird Name'/> 
              <TextInput
                style={textInputStyle.mini}
                onChangeText={(newText) => setBirdName(newText)}
                defaultValue='Bird Family'/>               
              <Text style={textStyle.mini}>Birdwatcher</Text>
            </View>
            <View>
              <TouchableOpacity style={touchableOpacityStyle.mini}>
                <Text style={buttons.mini}>Approve</Text>    
              </TouchableOpacity>
              <TouchableOpacity style={touchableOpacityStyle.mini}>
                <Text style={buttons.mini}>Remove</Text>    
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={touchableOpacityStyle.default}>
        <Text style={buttons.text}>Approve All</Text>    
      </TouchableOpacity>
    </View>
    );
} 