import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, ActivityIndicator, Text, StyleSheet, Image } from "react-native";
import PressableButton from "../../components/Button";
import { cloneDeep } from "../../lodash";
import {SaveUserShot} from '../../store/actions'


const randomPercentage = [ "Try to increase your speed by 10km/h", "Try to increase your bowl length", "Try to decrease your speed"]
const random_wtp = Math.floor(Math.random() * randomPercentage.length);

class ShowBowlingPrediction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shotDetails:{}
    };
  }

  async onSaveShot() {
    const { shotType,SaveUserShot } = this.props;
    let shotDetails=cloneDeep(shotType);
    shotDetails={...shotType};

    this.props.navigation.navigate("BattingStats");
  }

  

  render() {
    const { shotPredictLoading, shotType } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.predictedDiv}>
          <Text style={styles.divMsg}>Wicket Taking Percentage</Text>
        </View>
        <Image
          style={styles.battingImage}
          source={require("../../assets/cricketBowling/bowling_photo.jpg")}
        />
      

        {shotPredictLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
    
          <Text style={{fontSize : 50, color: "green", fontWeight: "bold"  }}>
            62.3%
          </Text>
          <Text style={{fontSize : 20, color: "black",  textAlign: "center"  }}>
            {randomPercentage[random_wtp]}      
          </Text>
          <Text style={{fontSize : 20, color: "black",  textAlign: "center"  }}>
               You can reach <Text style={{ color: "green", fontWeight: "bold"}}> 66%</Text>
          </Text>
           
          </>
        )}

        <View styles={styles.buttonFlex}>
          <PressableButton
            onPress={() => this.onSaveShot()}
            title="Save Results"
            bgColor="rgba(108, 105, 213, 0.37)"
            // txtColor="black"
          />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  predictedDiv: {
    backgroundColor: "rgba(108, 105, 213, 0.37)",
    borderRadius: 8,
    width: 350,
    height:48,
    marginBottom: 10,
  },
  divMsg: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 13,
  },
  input: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  battingImage: {
    width: 300,
    height: 370,
    borderRadius: 40
  },
  
  predicted: {
    fontSize: 20,
    color: "#59597C",
    fontWeight: "bold",
    textAlign:"center"
  },
  accuracy: {
    marginTop:3,
    fontSize: 16,
    color: "#59597C",
    fontWeight: "bold",
    textAlign:"center"
  },
  buttonFlex: {
    display: "flex",
    flexDirection: "row",
  },
});

const mapStateToProps = (state) => {
  return {
    shotPredictLoading: state.shot.shotPredictLoading,
    shotType: state.shot.shotType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    SaveUserShot
  }, dispatch);
};

ShowBowlingPrediction = connect(mapStateToProps, mapDispatchToProps)(ShowBowlingPrediction);

export { ShowBowlingPrediction };
