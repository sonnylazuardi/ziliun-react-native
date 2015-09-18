/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  BackAndroid,
  Navigator,
  ToolbarAndroid,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  DrawerLayoutAndroid,
  TouchableHighlight,
} = React;

var ArticleListScreen = require('./ArticleListScreen');
var ArticleScreen = require('./ArticleScreen');
var dismissKeyboard = require('dismissKeyboard');

var _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var DrawerLayout = React.createClass({
  getDefaultProps: function() {
    return {
      icon: {uri: "android_back_white", isStatic: true},
    }
  },
  openDrawer: function() {
    this.refs.drawer.openDrawer();
  },
  selectMenu: function(title, link) {
    dismissKeyboard();
    this.props.navigator.push({
      title: title,
      name: link,
    });
  },
  renderMenu: function(menu) {
    return (
      <View style={{
      }}>
        <TouchableHighlight
          style={{
            height: 55,
            padding: 20,
            paddingLeft: 30,
          }}
          underlayColor="#dddddd"
          onPress={() => this.selectMenu(menu.text, menu.link)}>
            <Text style={{color: 'white'}}>{menu.text}</Text>
        </TouchableHighlight>
      </View>
    );
  },
  render: function() {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    var navigationView = (
      <View style={{flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch'}}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          height: 60,
        }}>
          <Image source={{uri:'ziliun_logo_large', isStatic: true}} style={{flex: 1}}/>
        </View>
        <View style={{
          flex: 2,
          backgroundColor: '#f7913d',
        }}>
          <ListView
            dataSource={dataSource.cloneWithRows([
              {
                id: 1,
                text: 'Featured',
                link: 'featured'
              },
              {
                id: 2,
                text: 'Insight',
                link: 'insight'
              },
              {
                id: 3,
                text: 'Opinion',
                link: 'opinion'
              },
              {
                id: 4,
                text: 'Story',
                link: 'story'
              },
            ])}
            renderRow={this.renderMenu}
            style={styles.listMenu}
          />
        </View>
      </View>
    );
    return (
      <DrawerLayoutAndroid
        ref="drawer"
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        
        <View style={{flex: 1}}>
          <ToolbarAndroid
            actions={[]}
            navIcon={this.props.icon}
            onIconClicked={this.openDrawer}
            style={styles.toolbar}
            titleColor="white"
            title={this.props.title}
             />
             {this.props.children}
        </View>
      </DrawerLayoutAndroid>
    );
  },
})

var RouteMapper = function (route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations;
  switch (route.name) {
    case 'featured':
    case 'insight':
    case 'opinion':
    case 'story':
      return (
        <DrawerLayout icon={{uri: "android_menu_white", isStatic: true}} title={route.title} navigator={navigationOperations}>
          <ArticleListScreen category={route.name} navigator={navigationOperations}/>
        </DrawerLayout>
      );
      break;
    case 'article':
        return (
          <View style={{flex: 1}}>
            <ToolbarAndroid
              actions={[]}
              navIcon={{uri: "android_back_white", isStatic: true}}
              onIconClicked={navigationOperations.pop}
              style={styles.toolbar}
              titleColor="white"
              title={route.title} />
            <ArticleScreen
              style={{flex: 1}}
              navigator={navigationOperations}
              slug={route.slug} />
          </View>
        );
      break;
  }
  return (<Text>Not Found</Text>);
}

var ZiliunApp = React.createClass({
  render: function() {
    var initialRoute = {name: 'featured', title: 'Featured'};
    return (
      <Navigator
        style={styles.container}
        initialRoute={initialRoute}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={RouteMapper} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    backgroundColor: '#f7913d',
    height: 56,
  },
  listMenu: {

  },
  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginLeft: 4,
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
});

AppRegistry.registerComponent('ZiliunApp', () => ZiliunApp);