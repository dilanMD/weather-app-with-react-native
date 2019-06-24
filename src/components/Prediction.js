import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";

export default class Prediction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  dayPicker(applicable_date, index) {
    $day = new Date().getDay() + 1 + index;
    $weeks = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
		];
    $weekname = $weeks[$day];
  }

  render() {
    return (
      <View>
        {this.props.prediction.map((item, index) => (
          <View style={this.props.style} key={index}>
            <Text
              style={styles.day}
              onLoad={this.dayPicker(item.applicable_date, index)}
            >
              {
								$weekname
							}
            </Text>
            <Image
              source={{ uri: 'https://www.metaweather.com/static/img/weather/png/'+item.weather_state_abbr+'.png' }}
              style={{ width: 30, height: 30 }}
            />
            <Text style={styles.max_temp}>{item.max_temp.toFixed(0)}</Text>
            <Text style={styles.min_temp}>{item.min_temp.toFixed(0)}</Text>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  day: {
    flex: 0.6,
    flexDirection: "column",
    paddingLeft: 30,
    color: "white",
    fontSize: 22
  },
  icon: {
    flex: 0.2,
    flexDirection: "column",
    // paddingLeft: 30,
    color: "white",
    fontSize: 20,
    marginTop: 7
  },
  max_temp: {
    flex: 0.1,
    flexDirection: "column",
    paddingLeft: 50,
    color: "white",
    fontSize: 22,
    justifyContent: "flex-end"
  },
  min_temp: {
    flex: 0.1,
    flexDirection: "column",
    paddingLeft: 15,
    // paddingRight: 10,
    color: "grey",
    fontSize: 22,
    justifyContent: "flex-end"
  }
});
