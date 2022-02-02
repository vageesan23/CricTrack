import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, StyleSheet } from "react-native";
import { SelectVideo } from "./selectVideo";



class UploadBottomScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shotDetails: {},
    };
  }

  render() {
    return (
      <View>
          <SelectVideo {...this.props}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  card1: {
    height: 200,
  },
});

const mapStateToProps = (state) => {
  return {
    shotPredictLoading: state.shot.shotPredictLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

UploadBottomScreen = connect(mapStateToProps, mapDispatchToProps)(UploadBottomScreen);

export { UploadBottomScreen };
