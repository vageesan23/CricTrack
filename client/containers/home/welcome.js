import React, { Component } from "react";
import { View, StyleSheet, Image, Text ,Dimensions} from "react-native";

import PressableButton from "../../components/Button";
const dimensions = Dimensions.get('window');
// const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;
const windowHeight = Dimensions.get('window').height;


class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        
        <View style={styles.ImageStyle}>
        <Text style={styles.baseText}>WELCOME</Text>
          <Image
            style={{
              width: imageWidth,
              height: 500,
              flexDirection: "row",
              flexWrap: "wrap",
            }}
            source={require("../../assets/logo3.png")}
            resizeMode="contain"
          />
         
        </View>
        <View style={styles.buttonSection}>
          <PressableButton
            onPress={() => this.props.navigation.navigate("Login")}
            title="Login"
            bgColor="#256BF4"
            isBorder={true}
            txtColor="blue"
          />
          <PressableButton
            onPress={() => this.props.navigation.navigate("Register")}
            title="Register"
            bgColor="#256BF4"
            txtColor="white"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    backgroundColor: "#ffffff",
  },
  ImageStyle: {
    height: windowHeight - 220,
    marginTop:70,
   
  },
  iconCricket: {
    height: 20,
  },
  baseText: {
    color: "#0da82f",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    width: 300,
    height: 44,

    borderWidth: 1,
    borderColor: "black",
  },
  buttonSection: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  login: {
    backgroundColor: "#ffffff",
  },
});

export { WelcomePage};