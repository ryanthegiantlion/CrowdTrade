'use strict';
import React, {
  StyleSheet,
  Component,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';


class Menu extends Component {
    constructor(props) {
      super(props); 
        this.handleMenuItemPress = this.handleMenuItemPress.bind(this);
    }

    handleMenuItemPress(page) {
      this.props.onMenuItemPress(page);
    }

    render() {
      // TODO: pass these down as props
      const routes = [
        'trending', 
        'watchlist',
        'crowdchat',
        'news', 
        'virtualportfolio'];

      // TODO: do we want to define text in global resource file as estee does?
      const linkText = {
        trending: 'Trending',
        watchlist: 'Watch list',
        crowdchat: 'Crowd Chat',
        news: 'News',
        virtualportfolio: 'Virtual Portfolio'
      }

      return (
          <View style={styles.menu}>
            {routes.map(route =>
              <TouchableHighlight key={route} onPress={() => {this.handleMenuItemPress(route)}}>
                <View style={styles.menuItem}>
                  <Text
                    style={styles.menuItemText}
                  >{linkText[route]}</Text>
                </View>
              </TouchableHighlight>
            )}
          </View>
      );
    }
}

const styles = StyleSheet.create({
    menu: {
      backgroundColor: 'black',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 48,
    },
    menuItem: {
      padding: 8,
      borderTopColor: '#333',
      borderWidth: 1,
    },
    menuItemText: {
      color: 'white',
    },
  });

module.exports = Menu;