import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  SectionList,
  StatusBar,
  Button,
  Dimensions,
  Image
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Card, Icon } from "react-native-elements";
import { UploadBottomScreen } from "./uploadBottomScreen";
import Header from "../../components/header";
import { SelectVideo } from "./selectVideo";

const SECTIONS = [
  {
    title: "Batting",
    horizontal: true,
    data: [
      {
        key: "1",
        text: "Compare your Shot",
        uri: require("../../assets/battingPic.jpeg"),
        imageOption:true,
        videoOption:true
      },
      {
        key: "2",
        text: "Compare with International Player",
        uri: require("../../assets/battingPic.jpeg"),
        videoOption:true
      },

      {
        key: "3",
        text: "Stance",
        uri: require("../../assets/battingPic.jpeg"),
        imageOption:true,
        videoOption:false
      }
    ],
  },
  {
    title: "Bowling",
    horizontal: true,
    data: [
      {
        key: "1",
        text: "Wicket Taking Percentage",
        uri: require("../../assets/battingPic.jpeg"),
        videoOption:true
      },
      {
        key: "2",
        text: "Find your speed",
        uri: require("../../assets/battingPic.jpeg"),
        videoOption:true
      }
    ],
  },
];

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      close: false,
      type: "",
      selectedItem:"",
      optionImageSelected:false
    };
  }

  componentDidUpdate(prevState) {
    if (this.state.close) {
      this.RBSheet.close();
    }
  }

  closeTheSheet(value) {
    this.setState({
      close: value,
    });
  }

  typeSelected(type,item) { 
    this.setState({
      close: false,
      type,
      selectedItem:item.key
    });
  }
  
  render(){
    const{item,section}=this.props;
    let type=section.title;
  return (
    <View style={styles.item}>
      <Card containerStyle={{height:300,width:250}} >
        <Card.Title>{item.text}</Card.Title>
        <Card.Divider />
        <View style={styles.card1}>
          <Card.Image
            style={styles.image}
            source={item.uri}
          />
        </View>

      {item.imageOption ? 
        <Button
          icon={<Icon name="code" color="#ffffff" />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="Using Image"
          onPress={() => {
            this.RBSheet.open();
            this.typeSelected(type,item);
            this.setState({optionImageSelected:true})
          }}
        />
        : null}

    {item.videoOption ? 
      <Button
          icon={<Icon name="code" color="#ffffff" />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="Using Video"
          onPress={() => {
            this.RBSheet.open();
            this.typeSelected(type);
            this.setState({optionImageSelected:false})
          }}
        />
        : null}

        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={600}
          openDuration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center"
            }
          }}

          animationType="fade"
         
        >
          <UploadBottomScreen
             type={this.state.type}
             selectedItem={this.state.selectedItem}
             optionImageSelected={this.state.optionImageSelected}
              closeTheSheet={(value)=>this.closeTheSheet(value)}
             {...this.props}
             />
        </RBSheet>
      </Card>
    </View>
  );
};
}


class UploadMenuCard extends Component {


  render() {
    
    return (
      <View style={styles.container}>
        <View style={{height:100}}>
        <Header
        customStyles={styles.svgCurve}
        customHeight={100}
        customTop={0}
        customBgColor="#0A378F"
        header="Upload"
        headerContainer={styles.headerContainer}
        headerText={styles.headerText}
      />
      </View>
        <StatusBar style="light" />
        <SafeAreaView style={{ flex: 1 }}>
          <SectionList
            contentContainerStyle={{ paddingHorizontal: 10 }}
            stickySectionHeadersEnabled={false}
            sections={SECTIONS}
            renderSectionHeader={({ section }) => (
              <>
                <Text style={styles.sectionHeader}>{section.title}</Text>
                {section.horizontal ? (
                  <FlatList
                    horizontal
                    data={section.data}
                    renderItem={({ item }) => <ListItem item={item}  section={section}   {...this.props} />}
                    showsHorizontalScrollIndicator={false}
                  
                  />
                ) : null}
              </>
            )}
            renderItem={({ item, section }) => {
              if (section.horizontal) {
                return null;
              }
              return <ListItem item={item} section={section} />;
            }}
          />


              <SelectVideo {...this.props}/>
              
        </SafeAreaView>
      </View>
   

    

    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  sectionHeader: {
    fontWeight: "800",
    fontSize: 18,
    color: "#000000",
    marginTop: 20,
    marginBottom: 5,
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 500,
    height: 500
  },
  itemText: {
    color: "#000000",
    marginTop: 5,
  },
  image:{
    height: 150,
    width: 200,
    borderRadius:10,
  },
  card1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardSubtitle: {
    marginTop: 10, justifyContent: "center",fontSize:12,fontWeight:"400" 
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width
  },
  headerContainer: {
    marginTop: 25,
    marginHorizontal: 20,
    textAlign:"left"
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'left',
    marginTop: 35,
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

UploadMenuCard = connect(mapStateToProps, mapDispatchToProps)(UploadMenuCard);

export { UploadMenuCard };
