import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Button,
    Image,
    ScrollView,
    TabBarIOS,
    FlatList,
    SectionList,
    Header,
    TouchableHighlight,
    NavigatorIOS,
    WebView,
} from 'react-native';
import styles from '../styles.js';

// url to get my repos
const url = 'https://api.github.com/users/yzhan189/repos?client_id=xxxx&client_secret=xxxx';
// for back up use, import repo json from local file
var json = require('../repos.json');

/* Repository page */
export default class RepoPage extends Component {
    // set up tab navigation
    static navigationOptions = {
        tabBarLabel: 'Repositories',
        tabBarIcon: ({ tintColor }) => (
        <Image
            source={require('../images/images.png')}
            style={[styles.icon, {tintColor: tintColor}]}
        />
        ),
    };
  render() {
    // it returns page of list of repos
    // which is the initial route
    return (
      <NavigatorIOS
        initialRoute={{
          component: RepoList,
          title: 'My Public Repositories',
        }}
        style={{flex: 1}}
      />
    );
  }
}


/* the repo list layout
 * each is a button that navigate to web page */
class RepoList extends Component {
    /* constr: hold json list from github */
    constructor(props) {
      super(props)
      this.state = {
        json: []
      }
    }
    /* fecch repository as a json list and store in json */
    fetchRepos() {
      fetch(url)
        .then((res) => res.json() )
        .then((data) => {
            this.setState({
            json: data,
          })
        })
        .catch((error) => window.alert("Error in fectch") )
        // alert window when there is error.
    }

    /* navigation: go back */
    _handleBackPress() {
        // pop out, so you go to the last page view
        this.props.navigator.pop();
    }
    /* navigation: go to next page  */
    _handleNextPress(nextRoute) {
        // add nextRoute, and go to that page view
        this.props.navigator.push(nextRoute);
    }

    /* render each item in the list, it apply to the list  */
    renderItem = (item) =>{
        // get information of the repository
        // send repo url to next view
        const nextRoute = {
          component: repoWebView,
          title: item.item.name,
          passProps: { url: item.item.html_url},
        };
        // make a list item as a button
        // when click the button go to next view
        return  (
            <TouchableHighlight onPress={() => this._handleNextPress(nextRoute)} underlayColor="powderblue" >
                <View style = {styles.listItemContainer}>
                    <Text style={styles.item}>{item.item.name}</Text>
                    <Text style={styles.subitem}>{item.item.owner.login}</Text>
                    <Text style={styles.subitem}>({item.item.language}) {item.item.description}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        // first get information
        this.fetchRepos();
        // make a list view it will render each item in data
        return (
          <View style = {styles.listContainer}>
            <FlatList
              data={this.state.json}
              renderItem={this.renderItem}
            />
          </View>
        );
    }
}


/* web view for each repository */
class repoWebView extends Component {
  render() {
    // render a web page view of repo url
    return(
        <WebView
          source={{uri: this.props.url}}
          automaticallyAdjustContentInsets={false}
        />
    );
  }
}
