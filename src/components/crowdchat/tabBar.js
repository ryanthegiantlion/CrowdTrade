'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} = React;


var styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    backgroundColor: 'black',
  },

  tabs: {

    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#ccc',
  },
});

var CrowdChatTabBar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    underlineColor : React.PropTypes.string,
    backgroundColor : React.PropTypes.string,
    activeTextColor : React.PropTypes.string,
    inactiveTextColor : React.PropTypes.string,
  },

  renderTabOption(name, page) {
    var isTabActive = this.props.activeTab === page;
    var activeTextColor = this.props.activeTextColor || "#fdfe00";
    var inactiveTextColor = this.props.inactiveTextColor || "white";
    return (
      <TouchableOpacity style={[styles.tab]} key={name} onPress={() => this.props.goToPage(page)}>
        <View>
          <Text style={{color: isTabActive ? activeTextColor : inactiveTextColor,
            fontWeight: isTabActive ? 'bold' : 'normal'}}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  },

  render() {
    var containerWidth = this.props.containerWidth;
    var numberOfTabs = this.props.tabs.length;
    var tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: this.props.underlineColor || "navy",
      bottom: 0,
    };

    var left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0,  containerWidth / numberOfTabs]
    });

    // <View style={[styles.tabs, {backgroundColor : this.props.backgroundColor || null}, this.props.style, ]}>
    //     {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
    //     <Animated.View style={[tabUnderlineStyle, {left}]} />
    //   </View>

    return (
      <View style={[styles.tabs, {backgroundColor : this.props.backgroundColor || null}, this.props.style, ]}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
      </View>
    );
  },
});

module.exports = CrowdChatTabBar;
