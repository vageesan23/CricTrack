import React from 'react';
import styled from 'styled-components/native';

const ButtonContainer = styled.TouchableOpacity`
  margin-vertical: 40px;
  width: 165px;
  height: 46px;
  padding: 12px;
  border-radius: 12px;
  margin-left:20px;
  margin-right:20px;
  borderColor:#256BF4;
  ${props => props.isBorder ? 'borderWidth:1px': '' };
  backgroundColor:${props => props.isBorder? '#ffffff':props.bgColor};
`;
const ButtonText = styled.Text`
  font-size: 16px;
  text-align: center;
  text-transform: uppercase;
  color: ${props => props.isBorder? '#000000' :'#FFFFFF'};
`;
const PressableButton = ({ onPress, bgColor, title,isBorder, txtColor }) => (
  <ButtonContainer onPress={onPress} bgColor={bgColor} isBorder={isBorder}>
    <ButtonText style={{ color: txtColor, fontWeight: "bold"}} isBorder={isBorder}>{title}</ButtonText>
  </ButtonContainer>
);
export default PressableButton;