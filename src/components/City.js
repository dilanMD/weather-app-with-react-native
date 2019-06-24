import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { connect } from 'react-redux'

export default class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: ""
    };
  }

  render() {
    return (
      <View style={this.props.style}>
        <Text style={styles.city}>{this.props.city}</Text>
        <Text style={styles.type}>{this.props.name}</Text>
        <Text style={styles.temperature}>{this.props.temperature}&deg;</Text>
        <Image 
          source={{uri: this.props.icon}} 
          style={{width: 80, height: 80}} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  city: {
    color: "white",
    fontSize: 34,
    alignItems: "center",
    paddingBottom: 5,
    paddingTop: 10
  },
  type: {
    color: "white",
    fontSize: 18,
    alignItems: "center",
    paddingBottom: 10
  },
  temperature: {
    fontSize: 84,
    alignItems: "center",
    color: "white",
    marginLeft: 25
  },
  icon: {
    fontSize: 48,
    color: "white"
  }
});
