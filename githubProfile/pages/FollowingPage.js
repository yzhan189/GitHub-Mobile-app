import React, {Component} from 'react';
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

const url = 'https://api.github.com/users/yzhan189/following?client_id=38e809410ccc3c8ddfd5&client_secret=5133a35db6667e1efe536f0a9bd081be0b76a59e';
import ProfilePage from './ProfilePage.js';


export default class FollowerPage extends Component {
    static navigationOptions = {
      tabBarLabel: 'Following',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../images/images.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    };
  render() {
    return (
        <NavigatorIOS
          initialRoute={{
            component: UserList,
            title: 'Following',
            passProps: { navigation: this.props.navigation},
          }}
          style={{flex: 1}}
        />
    );
  }
}



class UserList extends Component {
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
        const nextRoute = {
          component: ProfilePage,
          title: "Profile ",
          passProps: { navigation: this.props.navigation, username : item.item.login},
        };
        const {navigate} = this.props.navigation;
        // make a list item as a button
        // when click the button go to next view
        return  (
            <TouchableHighlight onPress={() => this._handleNextPress(nextRoute)} underlayColor="powderblue" >
                <View style = {styles.listItemContainer}>
                <View style = {styles.rowContainer}>
                    <Image style={styles.smallImage} source={{uri: item.item.avatar_url}}/>
                    <Text style={styles.item}>{item.item.login}</Text>
                </View>
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
