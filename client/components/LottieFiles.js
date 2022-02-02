import React from 'react';
import AnimatedLottieView from 'lottie-react-native';

export default class Lottie extends React.Component {
    
  render() {
    const{source}=this.props;
    return (
      <AnimatedLottieView
        source={source}
        autoPlay
        
      />
    );
  }
}