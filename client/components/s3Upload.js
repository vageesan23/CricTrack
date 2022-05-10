import React, { Component } from "react";
import { Button } from "react-native-elements";
import { useState } from "react";
import { ACCESS_KEY, SECRET_KEY_S3, REGION, BUCKET_NAME } from "@env";
import { RNS3 } from "react-native-aws3";
import { View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

function S3Upload(props) {
  const [imageUploadLoading, setImageUploadLoading] = useState(null);
  const [progress, setProgress] = useState(null);
  //imageFormat jpg/png
  //filename spilit by uri
  //uploadImageFormat - if it is image upload
  const file = {
    uri: props.image,
    name: props.filename,
    type: props.uploadImageFormat
      ? `image/${props.imageFormat}`
      : `video/${props.imageFormat}`,
  };

  const options = {
    keyPrefix: "batting/",
    bucket: 'cricketforyou1',
    region: 'us-east-1',
    accessKey: 'AKIATYRFNAPNDOEHM2GO',
    secretKey: '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',
    successActionStatus: 201,
  };

  const addPhoto = async () => {
    console.log(options)
    setImageUploadLoading(true);
    RNS3.put(file, options)
      .progress((event) => {
        setProgress(parseInt(event.percent * 100));
        console.log(`percent: ${event.percent * 100}`);
      })
      .then((res) => {
        if (res.status === 201) {
          ("Success", res.body);
          props.getResults(res.body.postResponse);
          setImageUploadLoading(false);
        }
      })
      .catch((err) => {
        setImageUploadLoading(false);
        console.log("error uploading to s3", err);
      });
  };

  return (
    <View>
      {imageUploadLoading ? (
        <AnimatedCircularProgress
          size={120}
          width={15}
          fill={progress}
          tintColor="#00e0ff"
          backgroundColor="#3d5875"
          padding={10}
        >
          {(fill) => (
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: 10,
              }}
            >
              Uploading {"\n"} {progress} %
            </Text>
          )}
        </AnimatedCircularProgress>
      ) : (
        <Button type="outline" title={"Upload"} onPress={addPhoto} />
      )}
    </View>
  );
}

export { S3Upload };
