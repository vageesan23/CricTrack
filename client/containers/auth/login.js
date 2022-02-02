import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Input, Button } from "react-native-elements";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import {PostLoginUser} from '../../store/actions'
import Lottie from '../../components/LottieFiles';
import { images } from "../../constants";
import { get } from '../../lodash';
import { isEmpty } from '../../lodash';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError:false,
      emptyPasswordError:false
    };
  }

  async onLogin() {
    const { email, password, emailError, emptyPasswordError } = this.state;
    const { PostLoginUser } = this.props;

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      this.setState({ emailError: true })
    }else{
      this.setState({ emailError: false })
    }

    if(isEmpty(password)){
      this.setState({ emptyPasswordError: true })
    }else{
      this.setState({ emptyPasswordError: false })
    }
    
    let loginObj = {};
    loginObj.email = email;
    loginObj.password = password;

    if(!emailError && !emptyPasswordError){
      await PostLoginUser(loginObj);
    }
    
  }

  render() {
    const { loginLoading , route,navigation} = this.props;
    const { emailError, emptyPasswordError}=this.state;
    let isRegistered=get(route,'params.register','');

    return (
      <View style={styles.container}>
      <View
        style={{
          flex: 1,
          paddingTop: 40,
          backgroundColor: "#fff",
          alignItems: "center"
        }}
      >
        <Button
          icon={<Icon name="arrow-back-outline" size={29} color="#333" />}
          buttonStyle={{
            backgroundColor: "#ffffff00"
          }}
          containerStyle={{
            position: "absolute",
            zIndex: 9,
            top: 40,
            left: 10
          }}
          onPress={() => navigation.navigate("Welcome")}
        /> 
      <Lottie source={images.register}/>
      </View>
      <View
        style={{
          flex: 2,
          backgroundColor: "#fff",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#636262",
            padding: 20,
            marginBottom: 10
          }}
        >
          Login to your account
        </Text>

          {isRegistered ? 
        <Text
          style={{
            fontSize: 14,
            color: "green",
            padding: 5,
            marginBottom: 5
          }}
        >
          Registered Successfully!
        </Text>
      :null }

     
        <View>
          <Input
            inputContainerStyle={{
              borderColor: "#ddd",
              borderWidth: 1,
              width: "90%",
              paddingHorizontal: 10,
              paddingTop: 1,
              paddingBottom: 3,
              borderRadius: 5
            }}
            errorMessage={emailError ? "Please enter a valid email" : null}
            inputStyle={{
              fontSize: 14
            }}
            keyboardType="email-address"
            placeholder="Email"
            onChangeText={(email) => this.setState({ email })}
            leftIcon={<Icon name="mail" size={18} color="#cacaca" />}
          />
          <Input
            inputContainerStyle={{
              borderColor: "#ddd",
              borderWidth: 1,
              width: "90%",
              paddingHorizontal: 10,
              paddingTop: 1,
              paddingBottom: 3,
              borderRadius: 10
            }}
            inputStyle={{
              fontSize: 14
            }}
            maxLength={20}
            placeholder="Password"
            errorMessage={emptyPasswordError ? "Please enter the password" : null}
            onChangeText={(password) => this.setState({ password })}
            secureTextEntry={true}
            leftIcon={<Icon name="lock-closed" size={18} color="#cacaca" />}
          />
          <View
            style={{
              paddingHorizontal: 10
            }}
          >
            <Button
              title="LOGIN"
              buttonStyle={{
                backgroundColor: "#256BF4",
                padding: 15,
                borderRadius: 40
              }}
              onPress={() => this.onLogin()}
              loading={loginLoading}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
              paddingHorizontal: 20
            }}
          
          >
            <Text
              style={{
                color: "#bfbfbf"
              }}
            >
              Don't have an account ?
            </Text>
            <Text
              style={{
                color: "#256BF4"
              }}
              onClick={() => navigation.navigate("Register")}
            >
              {" "}
              Register Here
            </Text>
          </View>
        </View>
      </View>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={true}
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: StatusBar.currentHeight
  }
});

const mapStateToProps = state => {
  return {
    message:state.shot.message,
    loginLoading:state.user.loginLoading
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      PostLoginUser
    },
    dispatch
  );
};

Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export  { Login };
