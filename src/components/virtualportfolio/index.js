'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  WebView,
  View,
  TouchableHighlight,
  Animated,
} from 'react-native';

var BGWASH = 'rgba(255,255,255,0.8)';

class VirtualPortfolio extends Component {
    constructor(props) {
      super(props);

      this.state = {
        url: "",
        rotate: new Animated.Value(0),
      }
    }

    onClick() {
      this.setState({url: 'https://facebook.github.io/react/'})
      //this.state.url = 'https://facebook.github.io/react/'
      Animated.timing(this.state.rotate, {
              toValue: 180,
              duration: 2000,
        }).start()
    }

    render() {
      let {rotate} = this.state
      // <View style={styles.experiment1}>
      //       <WebViews
      //         style={{
      //           backgroundColor: BGWASH,
      //           height: 200,
      //         }}
      //         source={{uri: 'https://facebook.github.io/react/'}}
      //         scalesPageToFit={this.state.scalingEnabled}/>
      let card1RotateY = rotate.interpolate({inputRange: [0, 180], outputRange: ["0deg", "180deg"]});
      let card2RotateY = rotate.interpolate({inputRange: [0, 180], outputRange: ["180deg", "360deg"]});
      // console.log('rotation')
      // console.log(rotateY)
      //console.log(card1RotateY)
      //console.log(card2RotateY)
      //{transform: [{rotateY}]};
      let card1AnimatedStyles = {transform: [{perspective: 1000},{rotateY: card1RotateY}]}
      let card2AnimatedStyles = {transform: [{perspective: 1000}, {rotateY: card2RotateY}]}
      let source = undefined
      // if (this.state.url)
      // {
      //   source = {source:{uri: this.state.url}}
      // }
      return (
        <View style={styles.container}>
          <Text style={styles.title}>VirtualPortfolio</Text> 
          <View style={styles.experiment1}>
            <WebView
              style={{
                backgroundColor: BGWASH,
                height: 200,
                transform: [{perspective: 200}, {rotateY: "210deg"}]
              }}
              source={{uri: 'https://facebook.github.io/react/'}}
              scalesPageToFit={true}/>

          </View>
          <View style={styles.experiment2}>
            <TouchableHighlight style={styles.flipcard} onPress={() => this.onClick()}>
              <View style={{flex:1}}>
                <Animated.View style={[styles.card2, card2AnimatedStyles]}>
                  <WebView
                    style={{
                      flex: 1,
                    }}
                    source={{uri: 'https://facebook.github.io/react/'}}
                    scalesPageToFit={true}/>
                </Animated.View>
                <Animated.View style={[styles.card1, card1AnimatedStyles]}>
                  <Text>Card 1</Text>
                </Animated.View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontSize: 20,
    },
    experiment1: {
      flex: 1,
    },
    experiment2: {
      flex: 1,
    },
    flipcard: {
      flex: 1,
      margin: 20,
      
    },
    card1: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'red',
      backfaceVisibility: 'hidden',
    },
    card2: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0, 
    },
  });

module.exports = VirtualPortfolio