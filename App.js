/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  ScrollView,
  TextInput,
  Button,
  View,
  Modal,
  Alert,
  Text
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import City from "./src/components/City";
import MetaData from "./src/components/MetaData";
import Prediction from "./src/components/Prediction";
import SplashScreen from "./src/components/SplashScreen";

// import { Avatar, Badge, Icon, withBadge } from "react-native-elements";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      modalVisible: false,
      query: "New Delhi",
      woeid: "",
      title: "",
      weather_state_abbr: "",
      weather_state_name: "",
      temperature: "",
      weather_state_icon: "",
      min_temp: "",
      max_temp: "",
      air_pressure: "",
      humidity: "",
      predictionArray: []
    };
    this.fetchWeather = this.fetchWeather.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    this.fetchWeather()

    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.setState({ isLoading: false });
    }
  }

  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve("result");
      }, 3000)
    );
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  handleChange(e) {
    this.setState(prevState => ({
      query: this.search._lastNativeText
    }))
  }

  handleSearch(e) {
    // console.log("clicked")
    // e.preventDefault();
    this.setState(prevState => ({
      title: this.search._lastNativeText
    }))
    this.fetchWeather()
    this.setModalVisible(!this.state.modalVisible)
    console.log(this.state.title)
  }

  fetchWeather() {
    $title = this.state.query
    fetch(`https://www.metaweather.com/api/location/search/?query=` + $title)
      .then(res => res.json())
      .then(jsonTitle => {
        this.setState({
          woeid: jsonTitle[0].woeid,
          title: jsonTitle[0].title
        });

        $woeid = jsonTitle[0].woeid;
        fetch(`https://www.metaweather.com/api/location/` + $woeid)
          .then(res => res.json())
          .then(json => {
            this.setState({
              weather_state_abbr:
                json.consolidated_weather[0].weather_state_abbr,
              weather_state_name:
                json.consolidated_weather[0].weather_state_name,
              temperature: json.consolidated_weather[0].the_temp.toFixed(0),
              weather_state_icon:
                "https://www.metaweather.com//static/img/weather/png/" +
                json.consolidated_weather[0].weather_state_abbr +
                ".png",
              min_temp: json.consolidated_weather[0].min_temp.toFixed(0),
              max_temp: json.consolidated_weather[0].max_temp.toFixed(0),
              air_pressure: json.consolidated_weather[0].air_pressure.toFixed(
                0
              ),
              humidity: json.consolidated_weather[0].humidity
            });
            // console.log(this.state.weather_state_icon)
          });
        $year = new Date().getFullYear();
        $month = new Date().getMonth() + 1;
        $day = new Date().getDate();

        $start_date = $year + "-" + $month + "-" + $day;
        var start = new Date($start_date);

        for (var i = 0; i < 5; i++) {
          
          var month =
            start.getMonth() + 1 >= 10
              ? start.getMonth() + 1
              : "0" + (start.getMonth() + 1);
          var day =
            start.getDate() >= 10 ? start.getDate() : "0" + start.getDate();
          var year = start.getFullYear();
          var date = year + "-" + month + "-" + day; //yyyy-mm-dd

          fetch(
            `https://www.metaweather.com/api/location/` +
              $woeid +
              `/` +
              year +
              `/` +
              month +
              `/` +
              day +
              `/`
          )
            .then(res => res.json())
            .then(jsonLoop => {
              // console.log(jsonLoop[0]);
              //var predictionArray = this.state.prediction.slice();
              //predictionArray.push(jsonLoop);
              //console.log(jsonLoop[0]);
              this.setState({
                predictionArray: [...this.state.predictionArray, jsonLoop[0]]
              });
              // console.log(this.state.predictionArray);
            });

          start = new Date(start.setDate(start.getDate() + 1));
          console.log(start)
        }
      });
  }

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }
    return (
      <ScrollView style={styles.container}>
        <ImageBackground
          source={require("./src/images/night.jpg")}
          style={styles.bg}
          blurRadius={4}
        >
          <View style={{ marginTop: 22 }}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
            >
              <View style={{ marginTop: 22 }}>
                <View>
                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  >
                    <Icon name="arrow-left" style={styles.closeIcon} />
                  </TouchableHighlight>
                  <TouchableOpacity style={styles.searchWrapper}>
                    <TextInput
                      style={styles.textInput}
                      ref={ref => {
                        this.search = ref;
                      }}
                      onChange={this.handleChange}
                    />
                    <Button
                      style={styles.button}
                      title="Search"
                      onPress={this.handleSearch}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <Icon name="search" style={styles.searchIcon} />
            </TouchableHighlight>
          </View>

          <City
            style={styles.city}
            name={this.state.weather_state_name}
            city={this.state.title}
            temperature={this.state.temperature}
            icon={this.state.weather_state_icon}
          />
          <MetaData
            style={styles.metadata}
            min_temp={this.state.min_temp}
            max_temp={this.state.max_temp}
            air_pressure={this.state.air_pressure}
            humidity={this.state.humidity}
          />
          <Prediction
            style={styles.prediction}
            prediction={this.state.predictionArray}
            icon={this.state.weather_state_icon}
          />
        </ImageBackground>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bg: {
    height: "100%"
  },
  city: {
    flex: 0.9,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
    // borderBottomColor: "#e0edff",
    // borderBottomWidth: 1
    // backgroundColor: "red"
  },
  metadata: {
    flex: 0.4,
    // marginTop: 10,
    flexDirection: "row",
    borderBottomColor: "#e0edff",
    borderBottomWidth: 1,
    paddingBottom: 10
    // width: "100%",
    // height: "100%"
    // backgroundColor: "green"
  },
  prediction: {
    flex: 0.7,
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 10
    // backgroundColor: "blue"
  },
  searchWrapper: {
    flexDirection: "row"
  },
  textInput: {
    flex: 1,
    height: 40,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    fontSize: 18,
    paddingHorizontal: 10
  },
  button: {
    flex: 1
  },
  searchIcon: {
    fontSize: 24,
    color: "white",
    // position: "absolute",
    // right: 0,
    paddingHorizontal: 15,
    marginLeft: 330
  },
  closeIcon: {
    fontSize: 24,
    color: "black",
    // position: "absolute",
    // right: 0,
    paddingHorizontal: 15
  }
});
