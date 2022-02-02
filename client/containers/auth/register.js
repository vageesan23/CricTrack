import React, { Component } from "react";
import { StyleSheet, Text, View, Image, StatusBar } from "react-native";

import { Input, Button } from "react-native-elements";
import { PostRegisterUser } from "../../store/actions";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Lottie from "../../components/LottieFiles";
import { images } from "../../constants";
import { isEmpty } from '../../lodash';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      emailError:false,
      emptyPasswordError:false,
      usernameError:false
    };
  }

  async onRegister() {
    const { username, password, email,emailError,emptyPasswordError,usernameError } = this.state;
    const { PostRegisterUser,navigation } = this.props;


    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      this.setState({ emailError: true })
    }else{
      this.setState({ emailError: false })
    }

    if(isEmpty(username)){
      this.setState({ usernameError: true })
    }else{
      this.setState({ usernameError: false })
    }

    if(isEmpty(password) || password.length <7){
      this.setState({ emptyPasswordError: true })
    }else{
      this.setState({ emptyPasswordError: false })
    }
    


    let user = { email: email, password: password, username: username };

    if(!emailError &&  !emptyPasswordError && !usernameError){
      await PostRegisterUser(user);
      navigation.navigate("Login",{
        register:true
      });
    }
    
  }

  render() {
    const { navigation,registerUserLoading } = this.props;
    const { emailError, emptyPasswordError,usernameError}=this.state;
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            paddingTop: 40,
            backgroundColor: "#fff",
            alignItems: "center",
          }}
        >
          <Button
            icon={<Icon name="arrow-back-outline" size={29} color="#333" />}
            buttonStyle={{
              backgroundColor: "#ffffff00",
            }}
            containerStyle={{
              position: "absolute",
              zIndex: 9,
              top: 60,
              left: 10,
            }}
            onPress={() => navigation.navigate("Login")}
          />
          <Lottie source={images.register} />
        </View>

        <View
          style={{
            flex: 2,
            backgroundColor: "#fff",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#636262",
              padding: 20,
              marginBottom: 10,
            }}
          >
            Create New Account
          </Text>
          <View>
            <Input
              inputContainerStyle={{
                borderColor: "#ddd",
                borderWidth: 1,
                width: "100%",
                paddingHorizontal: 10,
                paddingTop: 1,
                paddingBottom: 3,
                borderRadius: 5,
              }}
              inputStyle={{
                fontSize: 14,
              }}
              maxLength={100}
              errorMessage={emailError ? "Please enter a valid email" : null}
              keyboardType="email-address"
              placeholder="Email"
              onChangeText={(email) => this.setState({ email })}
              leftIcon={<Icon name="mail" size={18} color="#cacaca" />}
            />
            <Input
              inputContainerStyle={{
                borderColor: "#ddd",
                borderWidth: 1,
                width: "100%",
                paddingHorizontal: 10,
                paddingTop: 1,
                paddingBottom: 3,
                borderRadius: 5,
              }}
              inputStyle={{
                fontSize: 14,
              }}
              maxLength={100}
              errorMessage ={usernameError ?"Please enter a username" : null }
              placeholder="Username"
              onChangeText={(username) => this.setState({ username })}
              leftIcon={<Icon name="person-sharp" size={18} color="#cacaca" />}
            />
            <Input
              inputContainerStyle={{
                borderColor: "#ddd",
                borderWidth: 1,
                width: "100%",
                paddingHorizontal: 10,
                paddingTop: 1,
                paddingBottom: 3,
                borderRadius: 10,
              }}
              inputStyle={{
                fontSize: 14,
              }}
              maxLength={20}
              // minLength={7}
              placeholder="Password"
              errorMessage={emptyPasswordError ? "Credentials must be more than 7 characters" : null}
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}
              leftIcon={<Icon name="lock-closed" size={18} color="#cacaca" />}
            />
            <View
              style={{
                paddingHorizontal: 10,
              }}
            >
              <Button
                title="REGISTER"
                buttonStyle={{
                  backgroundColor: "#256BF4",
                  padding: 12,
                  width: "100%",
                  borderRadius: 40,
                }}
                loading={registerUserLoading}
                onPress={() => this.onRegister()}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                marginVertical: 10,
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  color: "#bfbfbf",
                }}
              >
                Aleardy have an account ?
              </Text>
              <Text
                style={{
                  color: "#256BF4",
                }}
              >
                {" "}
                Login here
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
    marginTop: StatusBar.currentHeight,
  },
});

const mapStateToProps = (state) => {
  return {
    registerUserLoading:state.user.registerUserLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      PostRegisterUser,
    },
    dispatch
  );
};

Register = connect(mapStateToProps, mapDispatchToProps)(Register);

export { Register };
