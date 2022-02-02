import React from "react";
import { ScrollView } from "react-native";

import { StyleSheet, View } from "react-native";

const BoxContainer = (props) => {
  return (
   
    <View style={{ ...styles.boxContainer, ...props.style }}>
       <ScrollView>
      {props.children}
      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  boxContainer: {
    shadowColor: "#FAFAFA",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5.0,
    height: 220,
    margin: 20,
    borderRadius:8,
    
  },
});

export default BoxContainer;
