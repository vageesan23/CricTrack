import React, { Component } from "react";
import { postCricketShot } from "../../store/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import PressableButton from "../../components/Button";

import { Button, View, StyleSheet, Image, Platform } from "react-native";

function BowlingHomeScreen(props) {
  const [image, setImage] = useState(null);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onPredict = async () => {
    try {

      props.navigation.navigate("bowlingPrediction");
    } catch (error) {
      console.log("error :", error);
    }
  };
  
  const  refreshScreen = async () => {
    setImage(null)
  };

  return (<>
    <View style={{ flex: 1, alignItems: "center", marginTop: 120 }}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 375, height: 380 }} />
      )}
      </View>
        {image === null ? (
                      <View style={{ flex: 1, alignItems: "center", marginBottom: 300 }}>
                      {/* <Button title="Upload your bowling video" onPress={pickVideo} /> */}
                      <PressableButton
                        title="Upload Video"
                        isBorder={true}
                        onPress={pickVideo}
                        txtColor="blue" 
                        />
                    </View> ) : (   <>    
            <View style={{ flex: 1, alignItems: "center", marginTop: 330 }}>
              {/* <Button color="black" title={"Confirm Video"} onPress={onPredict} /> */}
                <PressableButton
                title="Confirm"
                isBorder={true}
                onPress={onPredict}
                txtColor="green"
              />
          </View>
        <View style={{ flex: 1, alignItems: "center", marginBottom: 140 }}>
          <PressableButton
              title="Cancel"
              isBorder={true}
              onPress={refreshScreen}
              txtColor="red"
            />
      </View>
  </>)
        }
      
    </>
  );
}


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

BowlingHomeScreen = connect(mapStateToProps, mapDispatchToProps)(BowlingHomeScreen);

export { BowlingHomeScreen };
