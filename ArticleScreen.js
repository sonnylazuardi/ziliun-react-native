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
} = React;

var REQUEST_URL = 'http://busintime.id:6001/article/';

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

    var text = this.state.article.content.map((item) => {
      return (
        <Text style={styles.text}>
          {item}
        </Text>
      );
    })

    var subimage = (
      <Image source={{uri: this.state.article.subimage}} style={styles.subimage} />
    );

    text.push(subimage);

    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View>
          <Image source={{uri: this.state.article.image}} style={styles.image} />

          <View style={{flex: 1, padding: 15}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', lineHeight: 24, textAlign: 'center'}}>{this.state.article.title}</Text>
            <View style={{marginBottom: 20, marginTop: 10}}>
              <Text style={{fontSize: 10, fontWeight: 'bold', color: '#f7913d', textAlign: 'center'}}>{this.state.article.category} - {this.state.article.author}</Text>
            </View>
            {text}
          </View>
        </View>
      </ScrollView>
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
});

module.exports = ArticleListScreen;