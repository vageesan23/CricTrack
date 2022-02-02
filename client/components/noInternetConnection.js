import React from 'react';
import { StyleSheet, View,Button, Image } from 'react-native';
import Lottie from './LottieFiles';
import { images } from "../constants";



export default class NoConnectionScreen extends React.Component{
  render(){  
    const {onReload}=this.props;
  return (
    <View style={styles.container}>
      <Lottie source={images.noInternet}/>

      <View style={{marginTop:20}}>
      <Button title="Reload page"
      onPress={onReload}
     />
     </View>
  </View>
  )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
