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
  ScrollView,
  ProgressBarAndroid,
  Alert
} = React;

var REQUEST_URL = 'http://busintime.id:6001/article/';
var ParallaxView = require('react-native-parallax-view');

var ArticleListScreen = React.createClass({
  getInitialState: function() {
    return {
      article: {
        title: null,
        content: []
      },
      loaded: false
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    console.log(REQUEST_URL + this.props.slug);
    fetch(REQUEST_URL + this.props.slug)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          article: responseData,
          loaded: true
        });
      })
      .catch(function(ex) {
        Alert.alert('Ziliun', 'Failed to load article');
      })
      .done();
  },
  renderLoadingView: function() {
    return (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <ProgressBarAndroid styleAttr="Small"/>
        <Text style={{textAlign: 'center'}}>
          Loading article...
        </Text>
      </View>
    )
  },
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    var text = this.state.article.content.map((item, i) => {
      return (
        <Text key={i} style={styles.text}>
          {item}
        </Text>
      );
    });

    var subimage = (
      <Image key={'subimage'} source={{uri: this.state.article.subimage}} style={styles.subimage} />
    );

    text.push(subimage);

    return (
      <ParallaxView
        ref={component => this._scrollView = component}
        backgroundSource={{ uri: this.state.article.image }}
        windowHeight={300}
        header={(
          <View style={styles.header}>
            <Text style={{fontSize: 18, fontWeight: 'bold', lineHeight: 24, textAlign: 'center', color: 'white'}}>{this.state.article.title}</Text>
            <View style={{marginBottom: 20, marginTop: 10}}>
              <Text style={{fontSize: 10, fontWeight: 'bold', color: '#f7913d', textAlign: 'center'}}>{this.state.article.category} - {this.state.article.author}</Text>
            </View>
          </View>
        )}>
          <View style={{flex: 1, padding: 15}}>
            {text}
          </View>
      </ParallaxView>
    );
    
  }
});

var styles = StyleSheet.create({
  contentContainer: {
    padding: 0,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  a: {
    fontWeight: '300',
    color: '#FF3366', // pink links 
  },
  text: {
    padding: 5,
    lineHeight: 20
  },
  image: {
    flex: 1,
    height: 150,
    backgroundColor: '#888888',
  },
  subimage: {
    flex: 1,
    height: 150,
    backgroundColor: '#888888',
  },
  header: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 24
  }
});


module.exports = ArticleListScreen;