import { StyleSheet } from 'react-native';
import Constants from "expo-constants";

const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00236a', // Dark background
    // backgroundColor: '#D3DEFF',  // Light background
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 20,
  },
  middle_container: {
    flex: 1,
    backgroundColor: '#00236a', // Dark background
    // backgroundColor: '#D3DEFF',  // Light background
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#D3DEFF',
    fontSize: 22,
  },
  bird_container: {
    backgroundColor: '#00236a', // Dark background
    flexDirection: 'row',
    width: '90%',
    alignItems: 'flex-start',
  },  

})

const touchableOpacityStyle = StyleSheet.create({
  default:{
    width:'100%', 
    height:'auto', 
    borderWidth: 1,
    borderRadius: 10,
    borderColor:'#386AFF',
    backgroundColor: '#0833B5',
    justifyContent: 'center',
    alignItems: 'center', 
    marginVertical: 5,
    padding: 10
  },
  mini:{
    width: '100%',
    height:'auto', 
    borderWidth: 1,
    borderRadius: 20,
    borderColor:'#386AFF',
    backgroundColor: '#0833B5',
    justifyContent: 'center',
    alignItems: 'center', 
    marginVertical: 2,
    padding: 5
  }

})

const buttons = StyleSheet.create({
  view:{
    marginTop: 10,
    width: '85%',
    alignItems: 'center',
    
  },
  in_view:{
    marginTop: 10,
  },
  wide: {
  }, 
  medium: {
    width: '60%',
  }, 
  narrow:{
    width: '40%'
  },
  text: {
    color: '#D3DEFF',
    fontSize: 22,
  },
  camera:{
    height: 40,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mini: {
    color: '#D3DEFF',
    fontSize: 14,
  },
})

const textStyle = StyleSheet.create({
  h1:{
    fontSize: 38,
    fontWeight: 'bold',
    color: '#D3DEFF',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
  h2:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#7D9CFF',
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 10, 
  },
  h3:{
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E5FFF',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
  default: {
    color: '#D3DEFF',
    fontSize: 18,
  },
  camera: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E9730F',
    marginLeft: 10,
  },
  error: {
    color: '#FF0000',
    fontSize: 18,
    marginHorizontal: 20,
  },
  id_header1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7D9CFF',
    marginVertical: 10,
  },
  id_header2: {    
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E5FFF',
    marginBottom: 20,
  },
  id_text:{
    color: '#D3DEFF',
    fontSize: 16,
    marginBottom: 20,
  },
  mini: {
    color: '#D3DEFF',
    fontSize: 14,
  },
})

const imgStyle = StyleSheet.create({
  view:{
    width: '90%',
  },
  default: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    alignSelf: 'center',
  },
  medium:{
    width: '80%',
    height: undefined,
    aspectRatio: 1,
    alignSelf: 'center',
  },
  small: {
    marginHorizontal: 20,
    width: '60%',
    height: undefined,
    aspectRatio: 1,
  },
  long_logo:{
    width: '90%',
    height: undefined,
    aspectRatio: 3,
    alignSelf: 'center',
  },
  mini:{
    marginHorizontal: 10,
    width: '30%',
    height: undefined,
    aspectRatio: 1,
  },
})

const textInputStyle = StyleSheet.create({
  view:{
    alignItems: 'stretch',
    // marginHorizontal: 1,
    marginBottom:20,
  },
  default: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius:10,
    borderColor:'black',
    borderWidth: 1,
    fontSize: 16,
    textAlign: 'left',
    width: 'auto',
  },
  mini: {
    backgroundColor: 'white',
    paddingHorizontal: 2,
    borderRadius:10,
    borderWidth: 1,
    fontSize: 12,
    textAlign: 'left',
    width: '100%',
  }

})

const dropDownStyle = StyleSheet.create({
  view:  {
    marginVertical: 10,
    maxWidth: '80%',
    flexDirection: 'row', 
    justifyContent: 'flex-start',
    alignItems: 'center', //Centered vertically
  },
  item:{
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: "#666",
    backgroundColor: '#D3DEFF',
    paddingVertical: 5,
    borderRadius:10,
    borderColor:'black',
    borderWidth: 1,
    fontSize: 16,
  },
  default: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: "#666",
    backgroundColor: '#D3DEFF',
    paddingVertical: 5,
    borderRadius:10,
    borderColor:'black',
    borderWidth: 1,
    fontSize: 16,
  },
})

const pickerStyle = StyleSheet.create({
  view: {
    marginVertical: 20,
    maxWidth: '80%',

  },
  item:{
    color:'#D3DEFF',
    fontSize: 24, 
    height: 50, 
    width: 150,
  },
  default:{
    color:'#D3DEFF', 
    fontSize: 24, height: 50, 
    width: '40%',
  },
  pickerr:{
    // IDK
    marginVertical: 30,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#666",
    backgroundColor: '#D3DEFF',
    paddingVertical: 5,
    borderRadius:10,
    borderColor:'black',
    borderWidth: 1,
    fontSize: 16,
  }
})

const cameraStyle = StyleSheet.create({
  default:{
    flex: 5,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#000',
    padding: 8,
  },
  controls: {
    flex: 0.5,
  },
  topControls: {
    flex: 1,
  },
  in_buttons: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  in_text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#f1f1f1',
    marginLeft: 10,
  },
  in_camera:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
})

const mapStyle = StyleSheet.create({
  full_page: {
    // width: Dimensions.get('window').width - 20,
    // height: Dimensions.get('window').height - 20,
  },
  default: {
    flex: 1, //the container will fill the whole screen.
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export { customStyles, buttons , touchableOpacityStyle, imgStyle, textStyle, 
  textInputStyle, dropDownStyle, pickerStyle, cameraStyle, mapStyle}