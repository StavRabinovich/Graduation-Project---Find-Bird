// import * as React from 'react';
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import {
  customStyles,
  buttons,
  textStyle,
  touchableOpacityStyle,
  imgStyle,
} from "../assets/AppStyles";
import DropDownPicker from "react-native-dropdown-picker";
import {
  get_all_birds_types,
  get_bird_info,
  get_bird_image,
} from "../requests/BirdsRequest";
import { BirdInfo } from "../assets/utils/MyObjs";
import { BirdCard } from "../assets/utils/BirdCard";

export default function BirdInfoScreen({ navigation }) {
  const name = "The Bird Name";

  const [open, setOpen] = useState(false);
  const [bird, setBird] = useState(null);
  const [items, setItems] = useState([]);
  const [image, setImage] = useState(null);
  const [info, setInfo] = useState("");

  const update_info = async (bird_name) => {
    try {
      const res = await get_bird_info(bird_name);
      const body = await res.json();
      console.log(await body.bird_info);
      setInfo(body.bird_info);
    } catch {
      Alert.alert("failed", `Failed to read info for bird ${bird_name}.`);
    }
    try {
      const res = await get_bird_image(bird_name);
      setImage(res);
    } catch {
      Alert.alert("failed", `Failed to load image from server`);
    }
  };

  useEffect(() => {
    const fetchDate = async () => {
      const res = await get_all_birds_types();
      console.log(`Status = ${res.status}`);

      if (res.status === 200) {
        let body = await res.json();
        const types = body.birds_types;
        setItems(types);
      }
    };
    fetchDate().catch((err) => {});
  }, []);

  return (
    <SafeAreaView style={customStyles.container}>
        <View>
          <Image
            style={imgStyle.long_logo}
            source={require("../assets/logo_white.png")}
          />
        </View>
        <View>
          <Text style={textStyle.h1}>Find bird</Text>
          <DropDownPicker
            open={open}
            value={bird}
            items={items}
            setOpen={setOpen}
            setValue={setBird}
            setItems={setItems}
            onSelectItem={(value) => update_info(value.value)}
            searchable={true}
            placeholder="Select your bird"
          />
        </View>

        <ScrollView style={customStyles.container}>
          <View style={customStyles.bird_container}>
            <View>
              <Text style={textStyle.id_header1}>{name}</Text>
            </View>
            <View>
              <Image
                style={[imgStyle.small, {}]}
                source={require("../assets/sqlogo_white.png")}
              />
            </View>
          </View>
          <Text style={textStyle.id_text}>{info}</Text>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 224, height: 224 }}
            />
          ) : null}
          <TouchableOpacity style={touchableOpacityStyle.default}>
            <Text style={buttons.text}>Find bird on map</Text>
          </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  );
}
