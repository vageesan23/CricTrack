import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function Header({
  customStyles,
  customHeight,
  customTop,
  customBgColor,
  header,
  currentUser,
  backButton=false
}) {
  return (
    <View>
      <View style={customStyles}>
        <View style={{ backgroundColor: customBgColor, height: customHeight }}>
          <Svg
            height="60%"
            width="100%"
            viewBox="0 0 1440 320"
            style={{ position: "absolute", top: customTop }}
          >
            <Path
              fill={customBgColor}
              d="M0,192L80,208C160,224,320,256,480,245.3C640,235,800,181,960,160C1120,139,1280,149,1360,154.7L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            />
          </Svg>
        </View>
      </View>
      <View style={backButton ? styles.headerContainerWithBackButton : styles.headerContainer}>
        <Text style={styles.headerText}>{header}</Text>
        {currentUser ?
         
         <Text style={styles.userName}>Hi {currentUser.username}</Text>
     
       : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    textAlign: "left",
    display: "flex",
    flexDirection:"row",
    justifyContent:"space-between"
  },
  headerContainerWithBackButton: {
    marginTop: 60,
    marginHorizontal: 50,
    textAlign: "left",
    display: "flex",
    flexDirection:"row",
    justifyContent:"space-between"
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#ffffff",
    textAlign: "left",
  },
  userName: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#ffffff",
    textAlign: "right",
    marginTop:5
  },
});
