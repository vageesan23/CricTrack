import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import PressableButton from "../../components/Button";
import { Button } from "react-native-elements";
import { cloneDeep } from "../../lodash";
import { SaveUserShot } from "../../store/actions";
import Header from "../../components/header";
import { images } from "../../constants";
import Icon from "react-native-vector-icons/Ionicons";
class ShowPrediction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shotDetails: {},
    };
  }

  async onSaveShot() {
    const { shotType, SaveUserShot, currentUser } = this.props;
    let shotDetails = cloneDeep(shotType);
    shotDetails.shotType = shotDetails.predicted;
    shotDetails.user_id = currentUser.id;
    delete shotDetails.predicted;

    await SaveUserShot(shotDetails);

    this.props.navigation.navigate("Stats");
  }

  render() {
    const { shotPredictLoading, shotType, saveShotLoading, navigation } =this.props;
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
            customBgColor="#0A378F"
            header="Prediction"
            backButton={true}
          />
        </View>
        <View style={styles.container}>
          {shotType.notFound ? null : (
            <Image style={styles.battingImage} source={images.coverDrive} />
          )}

          {shotPredictLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <>
              {shotType.notFound ? (
                <View style={{ width: 300 , display:'flex',justifyContent: 'center'}}>
                  <Text style={styles.predicted}>
                    Sorry we could not analyse,{"\n"} Please try again with
                    different image
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.predicted}>{shotType.predicted}</Text>
                  <Text style={styles.accuracy}>
                    {shotType.predicted
                      ? `Accuracy of ${shotType.accuracy} %`
                      : `Something went wrong ${"\n"} Please upload again!`}
                  </Text>
                </View>
              )}
            </>
          )}

          {saveShotLoading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <View styles={styles.buttonFlex}>
              {shotType.notFound ? null : (
                <PressableButton
                  onPress={() => this.onSaveShot()}
                  title="Save"
                  bgColor="#256BF4"
                />
              )}
              <PressableButton
                onPress={() => this.props.navigation.navigate("HomePage")}
                title="Try Again..."
                bgColor="#5C60C2"
              />
            </View>
          )}
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
    shotPredictLoading: state.shot.shotPredictLoading,
    shotType: state.shot.shotType,
    saveShotLoading: state.shot.saveShotLoading,
    currentUser: state.user.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      SaveUserShot,
    },
    dispatch
  );
};

ShowPrediction = connect(mapStateToProps, mapDispatchToProps)(ShowPrediction);

export { ShowPrediction };
