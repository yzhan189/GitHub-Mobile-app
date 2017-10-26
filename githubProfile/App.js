
import { StackNavigator,TabNavigator, } from 'react-navigation';
import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  TabBarIOS,
  StyleSheet,

} from 'react-native';

import ProfilePage from './pages/ProfilePage.js';
import RepoPage from './pages/RepoPage.js';
import FollowerPage from './pages/FollowerPage.js';
import FollowingPage from './pages/FollowingPage.js';
import SwitchPage from './pages/SwitchPage.js';
import Login from './pages/LoginPage';


// set up tab navigator of four pages
const MyApp = TabNavigator({
    Profile: { screen: ProfilePage },
    Follower: { screen: FollowerPage },
    Following: { screen: FollowingPage },
    Repo: { screen: RepoPage },
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#e91e63',
    },
});

// render the pages with tab navigation
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: true};
    }

    render() {

        if (this.state.isLoggedIn){
          return (
              < MyApp />
          );
        } else {

          return <Login
                  onLoginPress={() => this.setState({isLoggedIn: true})}
                />;
        }

    }
}
//
