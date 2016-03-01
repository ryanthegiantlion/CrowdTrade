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
      const pages = [
        'Trending', 
        'News', 
        'Watch list', 
        'Crowd choice', 
        'Crowd chat',
        'Settings'];

      return (
          <View style={styles.menu}>
            {pages.map(page =>
              <TouchableHighlight key={page} onPress={() => {this.handleMenuItemPress(page)}}>
                <View style={styles.menuItem}>
                  <Text
                    style={styles.menuItemText}
                  >{page}</Text>
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