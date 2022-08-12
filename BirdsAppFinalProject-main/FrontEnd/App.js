import React, { Component } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import ApproveScreen from "./screens/ApproveScreen";
import AreaScreen from "./screens/AreaScreen";
import BirdIDScreen from "./screens/BirdIDScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RecognizeScreen from "./screens/RecognizeScreen";
import SearchBirdScreen from "./screens/BirdInfoScreen";
import SignUpScreen from "./screens/SignUpScreen";
import BirdInfoScreen from "./screens/BirdInfoScreen";

import { Provider } from 'react-redux';
import store from './redux/store';

const Stack = createNativeStackNavigator();
class App extends Component{
  render () {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home" // Name to navigate
              component={HomeScreen} // Component name
              options={{ title: "Home" }} // Title
            />
            <Stack.Screen
              name="Approve"
              component={ApproveScreen}
              options={{ title: "Approve" }}
            />
            <Stack.Screen
              name="Area"
              component={AreaScreen}
              options={{ title: "Area" }}
            />

            <Stack.Screen
              name="Info"
              component={BirdInfoScreen}
              options={{ title: "Info" }}
            />
            <Stack.Screen
              name="BirdID"
              component={BirdIDScreen}
              options={{ title: "BirdID" }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{ title: "Edit Profile" }}
            />

            <Stack.Screen
              name="LogIn"
              component={LoginScreen}
              options={{ title: "LogIn" }}
            />
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ title: "Main" }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: "Profile" }}
            />
            <Stack.Screen
              name="Recognize"
              component={RecognizeScreen}
              options={{ title: "Recognize" }}
            />
            <Stack.Screen
              name="Search"
              component={SearchBirdScreen}
              options={{ title: "Search" }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ title: "SignUp" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
}
}

export default App;
