import React, { Component } from "react";
import { postCricketShot,getTypeShotUsingImage, getStanceSimilariy } from "../../store/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import { S3Upload } from "../../components/s3Upload";
import { Button, View, StyleSheet, Image, Platform } from "react-native";
import { isEmpty } from "../../lodash";

function SelectVideo(props) {

  const [image, setImage] = useState(null);
  const video = React.useRef(null);
  const [imageFormat, setImageFormat] = useState('');
  const [filename, setFilename] = useState('');
  const [status, setStatus] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: props.optionImageSelected ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: props.optionImageSelected ? false :true,
      aspect: [16, 1],
      quality: 1,
    });
    let split = result.uri.split('/')
    let fileName = split[split.length - 1]
    if (!result.cancelled) {
      setImage(result.uri);
      setImageFormat(result.uri.split(".")[1])
      setFilename(fileName)
    }
  };
  const onPredictBowling = async () => {
    try {

      props.navigation.navigate("bowlingPrediction");
      props.closeTheSheet(true);
    } catch (error) {
      console.log("error :", error);
    }
  }


  const onPredictBatting = async (values) => {
    try {
     
      if(props.optionImageSelected){
        await props.getTypeShotUsingImage(values);
        props.navigation.navigate("show",{
          optionImageSelected:false
        });

      }else{
        await props.postCricketShot(values);
        props.navigation.navigate("show",{
          optionImageSelected:true
        });
      }
      
      props.closeTheSheet(true);
    } catch (error) {
      console.log("error :", error);
    }
  };

  const onStanceSimilarity = async (values) => {
    try {
     
      await props.getStanceSimilariy(values);
      props.navigation.navigate("stancePrediction",{
        optionImageSelected:true
      });

      props.closeTheSheet(true);
    } catch (error) {
      console.log("error :", error);
    }
  };


  

  const getResults=async (value)=>{
    if(value){
      console.log('props.item :', props.selectedItem);
      switch (props.selectedItem) {
        case '1':
          await onPredictBatting(value.key);
          break;
        case '3':
          await onStanceSimilarity(value.key);
          break;
      
        default:
          break;
      }
    }
  }

  return props.shotPredictLoading ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        style={styles.loadingImage}
        source={require("../../assets/loadingGifs/loader1.gif")}
      />
    </View>
  ) : (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {isEmpty(image) ? (
        <View style={{ marginBottom: 20 }}>
          <Button title={props.optionImageSelected ? "Select a image" :"Select a video"} onPress={pickImage} />
        </View>
      ) : null}
      {image && (
        <Image source={{ uri: image }} style={{ width: 370, height: 280 }} />
      )}

      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: image,
        }}
        useNativeControls
        resizeMode="contain"
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={{ marginTop: 20 }}>
        {image === null ? null : (
          <>
            <S3Upload
              image={image}
              imageFormat={imageFormat}
              filename={filename}
              uploadImageFormat={true}
              getResults={getResults}
            />
          </>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  input: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  input1: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    color:"black"
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
      getTypeShotUsingImage,
      getStanceSimilariy
      
    },
    dispatch
  );
};

SelectVideo = connect(mapStateToProps, mapDispatchToProps)(SelectVideo);

export { SelectVideo };
