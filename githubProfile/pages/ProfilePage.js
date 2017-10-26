import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  TabBarIOS,
} from 'react-native';
import styles from '../styles.js';

// api query
const API = 'https://api.github.com/users';
const API2 = 'https://api.github.com/user';
// oauth and access token not shown.
const OAuth = '?client_id=xxxx&client_secret=xxxx';
const token = '?access_token=9xxxx';
// user name to github to look at
var yourLogin = "yzhan189"

var myPage;

/* The home screen is the profile page */
export default class ProfilePage extends Component {
    /* constructor of state
     * it will hold data from github */
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            name:'',
            avatar:'',
            location:'',
            repos:'',
            followers: '',
            following:'',
            homeUrl:'',
            notFound:'',
            hasFollowed:false,
      }
    }

    /* fetch profile given username from github api */
    fetchProfile(username) {
      // get url query
      let url = `${API}/${username}${OAuth}`;
      // store state values: parse json file from github api
      fetch(url)
        .then((res) => res.json() )
        .then((data) => {
          this.setState({
            username: data.login,
            name: data.name,
            avatar: data.avatar_url,
            email: data.email,
            repos: data.public_repos,
            followers: data.followers,
            following: data.following,
            website: data.blog,
            create_date: data.created_at,
            bio: data.bio,
         })
        })
        .catch((error) => window.alert("Error in fetch") )
        // if there is error, pop out a window to show err message
    }

    /* tab navigation set up */
    static navigationOptions = {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../images/images.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    };


    _follow1(username){
        let url = `${API2}/following/${username}${token}`;
        var verb;
        if (this.state.hasFollowed){
            verb = "DELETE";
        }else {
            verb = "PUT";
        }

        fetch(url , {
          method: verb,
        })
        .then(function(response){
            if (response.ok){
                this.setState({hasFollowed: !this.state.hasFollowed})
            }else {
                window.alert("Unable to follow: "+response.status);
            }
        })
        .catch((error) => window.alert("Error in fetch") );
    }

    _follow(username){
        let url = `${API2}/following/${username}${token}`;
        let verb;

        if (this.state.hasFollowed){
            verb = "DELETE";
        }else {
            verb = "PUT";
        }
        fetch(url , {
          method: verb,
        })
        .then((response) => {
            if (response.status==204){
                this.setState({hasFollowed: !this.state.hasFollowed})
            }else {
                window.alert("Unable to follow: "+response.status);
            }
        })
        .catch((error) => window.alert(error.message) );
    }

    // deliver view
    render() {
        // set up navigation
        const { navigate } = this.props.navigation;

        // if it is my page
        if (typeof this.props.username == 'undefined'){
            myPage = true;
            this.fetchProfile(yourLogin);
        }  else{
            myPage = false;
            this.fetchProfile(this.props.username);
        }

        // a scroll view to display information
        // get each information from state and display them in view
        // and with their specific style
        return (
        <View style={styles.profileBackground}>
        <ScrollView>

            <View style={styles.container}>
                {myPage ? null :

                    <Button
                        onPress={() => this._follow(this.state.username)}
                        title = {this.state.hasFollowed ? "Unfollow" : "Follow"}
                        color = {this.state.hasFollowed ? "#ff3b30" : "#4cd964"}
                    />
                }
                <Image style={styles.profileImage} source={{uri: this.state.avatar}}/>

            </View>

            <View style = {styles.nameField}>
                <Text style = {styles.name}>{this.state.name}</Text>
                <Text style = {styles.id}>{this.state.username}</Text>
            </View>

            <View style = {styles.buttonContainer}>
                <Button
                onPress={() => navigate('Follower')}
                title="Follower"
                />
                <Text style = {styles.followNumber}>{this.state.followers} </Text>
                <Button
                onPress={() => navigate('Following')}
                title="Following"
                />
                <Text style = {styles.followNumber}>{this.state.following} </Text>
                <Button
                    onPress={() => navigate('Repo')}
                    title="Repo"
                />
                <Text style = {styles.followNumber}>{this.state.repos} </Text>
            </View>

            <View style = {{marginTop: 30, marginBottom: 30,}}>
                <View style = {styles.infoContainer}>
                <View style = {styles.infoOuterBox}>
                    <Text style = {styles.info}> Website: </Text>
                    <Text style = {styles.link}> {this.state.website}</Text>
                </View>
                </View>


                <View style = {styles.infoContainer}>
                <View style = {styles.infoOuterBox}>
                    <Text style = {styles.info}> Email: </Text>
                    <Text style = {styles.link}> {this.state.email}</Text>
                </View>
                </View>


                <View style = {styles.infoContainer}>
                <View style = {styles.infoOuterBox}>
                    <Text style = {styles.info}> Bio: </Text>
                    <Text style = {styles.info}> {this.state.bio}</Text>
                </View>
                </View>
            </View>

            <Text style = {styles.bottomInfo}> Created at {this.state.create_date} </Text>

        </ScrollView>
        </View>
  );
  }
}
