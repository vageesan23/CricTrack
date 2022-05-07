import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  View,
  ActivityIndicator,
  StyleSheet,
Text,
  Dimensions,
} from "react-native";

import { Button } from "react-native-elements";

import Header from "../../components/header";
import Icon from "react-native-vector-icons/Ionicons";
class ShowStance extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const {  navigation, stance ,stanceLoading} =this.props;
    
    return (
      <View style={{ backgroundColor: "white" }}>
        <View>
          <Button
            icon={<Icon name="arrow-back-outline" size={29} color="#fff" />}
            buttonStyle={{
              backgroundColor: "#ffffff00",
            }}
            containerStyle={{
              position: "absolute",
              zIndex: 9,
              top: 53,
              left: 10,
            }}
            onPress={() => navigation.navigate("HomePage")}
          />
          <Header
            customStyles={styles.svgCurve}
            customHeight={100}
            customTop={0}
            customBgColor="#0da82f"
            header="Prediction"
            backButton={true}
          />

        <View style={styles.container}>
        <Text>Similarity Of Your Image </Text>

          {stanceLoading ? (
            <ActivityIndicator size="large" />
          ) : (
                <View style={{ width: 300 , display:'flex',justifyContent: 'center'}}>
                  <Text style={styles.predicted}>
                  {parseFloat(stance).toFixed(2)}
                  </Text>
                </View>
          )}
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    marginTop: 40,
    display: "flex",
    alignItems: "center",
  },
  predictedDiv: {
    backgroundColor: "rgba(108, 105, 213, 0.37)",
    borderRadius: 8,
    width: 350,
    height: 48,
    marginBottom: 10,
  },
 
  input: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  predicted: {
    fontSize: 20,
    color: "#59597C",
    fontWeight: "bold",
    textAlign: "center",
  },
  accuracy: {
    marginTop: 3,
    fontSize: 16,
    color: "#59597C",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonFlex: {
    display: "flex",
    flexDirection: "row",
  },
  headerContainer: {
    marginTop: 25,
    marginHorizontal: 20,
    textAlign: "left",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "left",
    marginTop: 35,
  },
  svgCurve: {
    position: "absolute",
    width: Dimensions.get("window").width,
  },
});

const mapStateToProps = (state) => {
  return {
    stanceLoading: state.shot.stanceLoading,
    stance: state.shot.stance,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      
    },
    dispatch
  );
};

ShowStance = connect(mapStateToProps, mapDispatchToProps)(ShowStance);

export { ShowStance };
