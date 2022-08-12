import React, { useState, useEffect, useRef } from "react";
import { Text, View, SafeAreaView, Image, Alert } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import CamButton from "../assets/utils/CameraButtons";
import { cameraStyle } from "../assets/AppStyles";
import * as ImageManipulator from "expo-image-manipulator";
import { post_file } from "../requests/filesRequests";
import { predict_bird } from "../requests/BirdsRequest";

export default function RecognizeScreen({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const [galleryImage, setGalleryImage] = useState(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        cameraRef.current.ImageQ;
        const data = await cameraRef.current.takePictureAsync({ quality: 0.3 });
        console.log(data);
        setImage(data.uri);
        await ImageManipulator.manipulateAsync(
          data.uri,
          [{ resize: { width: 224, height: 224 } }],
          { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        console.log("saved successfully");
        console.log(`image = ${image}`);
        const imageUri = image.split("Camera/")[1];
        console.log(`uri = ${imageUri}`);
      } catch (error) {
        Alert.alert("Failed to save the image.");
        console.log(error);
      }
      post_image(image);
    }
  };

  const pickGalleryImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });
    // console.log(result);
    if (!result.cancelled) {
      post_image(result);
    }
  };

  const post_image = async (image) => {
    let imageUri = "";
    let res;
    try {
      if (image.uri) imageUri = image.uri.split("ImagePicker/")[1];
      else imageUri = image.split("Camera/")[1];
      console.log(imageUri);
      const file = await ImageManipulator.manipulateAsync(
        image.uri ? image.uri : image,
        [{ resize: { width: 224, height: 224 } }],
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
      );
      console.log(file);
      res = await post_file(file.uri, imageUri);
    } catch {
      Alert.alert("Failed to send the picture to the server");
      return;
      // console.log(image);
    }
    try {
      if (res === 200) {
        console.log(`Predicting bird ${imageUri}`);
        res = await predict_bird(imageUri);
        res = await res.json();
        Alert.alert("Success", `The bird is ${res.message}.`);
      }
    } catch {
      Alert.alert("Failed to predict the bird");
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <SafeAreaView style={cameraStyle.container}>
      {!image ? (
        <Camera
          style={cameraStyle.default}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          <View style={cameraStyle.in_camera}>
            <CamButton
              icon={"retweet"}
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
            <CamButton
              icon={"flash"}
              color={
                flash === Camera.Constants.FlashMode.off ? "gray" : "#f1f1f1"
              }
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              }}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={cameraStyle.default} />
      )}
      <View>
        {image ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
            }}
          >
            <CamButton
              title={"Re-take"}
              icon="retweet"
              onPress={() => setImage(null)}
            />
            <CamButton title={"Save"} icon="check" onPress={savePicture} />
          </View>
        ) : (
          <View>
            <CamButton
              title="Take a picture"
              onPress={takePicture}
              icon="camera"
            />
            <CamButton
              title="Pick gallery picture"
              onPress={pickGalleryImage}
              icon="image"
            />
            {galleryImage && (
              <Image
                source={{ uri: galleryImage }}
                style={{ width: 10, height: 10 }}
              />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
