import React, { Component } from "react";
import { postCricketShot } from "../../store/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { get } from "../../lodash";

class PredictScreen extends Component {
  async onPredict() {
    const { postCricketShot } = this.props;

    const values = {
      data: [
        [
          0.56246680021286, 0.3716861307621, 0.560554981231689,
          0.355878740549087, 0.551665663719177, 0.360781729221344,
          0.532199501991272, 0.436635762453079, 0.584463596343994,
          0.413900256156921, 0.586447834968567, 0.410683810710907,
          0.643497228622437, 0.392552345991135, 0.649301409721375,
          0.385532200336456, 0.682613253593445, 0.385006844997406,
          0.56970876455307, 0.644019544124603, 0.605164885520935,
          0.629045724868774, 0.570314764976501, 0.790631175041199,
          0.58903968334198, 0.787858605384827, 0.589288294315338,
          0.874492883682251, 0.582624733448029, 0.956705331802368,
        ],
      ],
    };

    await postCricketShot();
    this.props.navigation.navigate("show");
  }

  navigateToBowlingHome() {
    this.props.navigation.navigate("bowlingHome");
  }

  render() {
    const { shotPredictLoading,rout } = this.props;
    let optionImageSelected=get(route,'params.optionImageSelected','');
    return (<>
      <View style={styles.container}>
        {!shotPredictLoading ? (
          <Button
            style={styles.input}
            title={"Predict"}
            //   style={styles.input}
            onPress={this.onPredict.bind(this)}
          />
        ) : (
          <Image
            style={styles.loadingImage}
            source={require("../../assets/loadingGifs/loader1.gif")}
          />
        )}
        </View>
        <View  style= {{ marginBottom : 400}}>
          <Button
            title={"Login"}
            style= {{ padding:30}}
            title={"Bowling Home"}
            //   style={styles.input}
            onPress={this.navigateToBowlingHome.bind(this)}
          /></View>
      </>
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
  input: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  loadingImage: {
    borderRadius: 40,
    width: 300,
    height: 300,
  },
});

const mapStateToProps = (state) => {
  return {
    shotPredictLoading: state.shot.shotPredictLoading,
    shotType: state.shot.shotType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      postCricketShot,
    },
    dispatch
  );
};

PredictScreen = connect(mapStateToProps, mapDispatchToProps)(PredictScreen);

export { PredictScreen };
