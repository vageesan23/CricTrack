import moment from "moment";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";

const DateRangeComponent = () => {
  const [selectedRange, setRange] = useState({});
  return (
    <SafeAreaView>
      <View style={styles.container}>
       <Text>dd</Text>
        <View style={styles.container}>
        
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 50,
  },
  selectedDateContainerStyle: {
    height: 35,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  selectedDateStyle: {
    fontWeight: "bold",
    color: "white",
  },
});

export default DateRangeComponent;