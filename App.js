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
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground
} from "react-native";

import { RkCard } from "react-native-ui-kitten";
import Carousel, { Pagination } from "react-native-snap-carousel";

//TODO: Custme class
import { images } from "./src/constans";

//TODO: Json Files
import userDetails from "./src/userDetails.json";
const word = userDetails;

const { width, height } = Dimensions.get("screen");
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "screen"
);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);
const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;
const SLIDER_1_FIRST_ITEM = 0;

export default class App extends Component {
  constructor(props) {  
    super(props);
    this.state = {
      dataCar: [],
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    };
  }

  //TODO: Page life Cycle
 componentWillMount() {
    



    this.setState({  
      dataCar: word.userList
    });
  }
  
  componentDidMount(){  
    console.log('dataCar'+JSON.stringify(word.userList));
  }

  //TODO: func _renderItem
  _renderItem({ item, index }) {
    return (
      <View key={"card" + index}>
        <TouchableOpacity>
          <RkCard>
            <ImageBackground
              source={images[item.name]}
              borderRadius={10}
              imageStyle={{
                resizeMode: "cover" // works only here!
              }}
            >
              <View>
                <Text>{item.id}</Text>
                <Text>{item.name}</Text>
              </View>
            </ImageBackground>
          </RkCard>
        </TouchableOpacity>
      </View>
    );
  }

  //TODO: func getSwapCardDetails
  getSwapCardDetails(index) {
    console.log(index);
  }

  render() {
    const { slider1ActiveSlide } = this.state;
   const userList = [
      {
        "id": 1,
        "name": "appasaheb4"
      },
      {
        "id": 2,
        "name": "sagar"
      },
      {
        "id": 3,
        "name": "sachin"
      }
    ];
    return (
      <View style={styles.container}>
        <View style={styles.sliderView}>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={userList}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            onSnapToItem={index => this.getSwapCardDetails(index)}
          />
          <Pagination   
            data={this.state.userList}
            dotsLength={userList}
            activeDotIndex={slider1ActiveSlide}
            containerStyle={styles.paginationContainer}
            dotColor={"rgba(255, 255, 255, 0.92)"}
            dotStyle={styles.paginationDot}
            inactiveDotColor={"#000"}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={this._slider1Ref}
            tappableDots={!!this._slider1Ref}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sliderView: {
    flex: 4
  }
});
