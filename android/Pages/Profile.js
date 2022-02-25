import * as React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {Text, Button, Card} from 'react-native-paper';
import {APIgetMe} from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Profil extends React.Component {
  constructor(props) {
    super();
    this.state = {
      profilInfo: null,
    };
  }

  componentDidMount() {
    APIgetMe()
      .then(response => response.json())
      .then(json => this.setState({profilInfo: json}));
  }

  render() {
    if (this.state.profilInfo === null) {
      return (
        <ActivityIndicator
          style={{margin: '50%'}}
          size="large"
          color="#FF5700"
        />
      );
    }
    return (
      <View style={styles.container}>
        <Text
          style={{
            color: 'grey',
            marginBottom: 10,
            fontSize: 10,
            fontWeight: 'bold',
          }}>
          {'\n'} PROFILE
        </Text>
        <Card style={{marginBottom: 10}}>
          <Card.Content style={{alignItems: 'center'}}>
            <ImageBackground
              source={{uri: this.state.profilInfo.subreddit.header_img}}
              resizeMode="cover">
              <Image
                style={styles.logo}
                source={{
                  uri: this.state.profilInfo.icon_img,
                }}
              />
            </ImageBackground>
          </Card.Content>
        </Card>
        <Text
          style={{
            color: 'grey',
            marginBottom: 10,
            fontSize: 10,
            fontWeight: 'bold',
          }}>
          {'\n'} USERNAME
        </Text>
        <Card style={{marginBottom: 10}}>
          <Card.Content style={{alignItems: 'center'}}>
            <Text style={styles.profile_text}>
              {this.state.profilInfo.name}
            </Text>
          </Card.Content>
        </Card>
        <Text
          style={{
            color: 'grey',
            marginBottom: 10,
            fontSize: 10,
            fontWeight: 'bold',
          }}>
          {'\n'} DESCRIPTION
        </Text>
        <Card style={{marginBottom: 10}}>
          <Card.Content style={{alignItems: 'center'}}>
            <Text style={styles.profile_text}>
              {this.state.profilInfo.subreddit.description}
            </Text>
          </Card.Content>
        </Card>
        <Text
          style={{
            color: 'grey',
            marginBottom: 10,
            fontSize: 10,
            fontWeight: 'bold',
          }}>
          {'\n'} KARMA
        </Text>
        <Card style={{marginBottom: 10}}>
          <Card.Content style={{alignItems: 'center'}}>
            <Text style={styles.profile_text}>
              {this.state.profilInfo.total_karma}
            </Text>
          </Card.Content>
        </Card>
        <Text
          style={{
            color: 'grey',
            marginBottom: 10,
            fontSize: 10,
            fontWeight: 'bold',
          }}>
          {'\n'} SUBSCRIBERS
        </Text>
        <Card style={{marginBottom: 10}}>
          <Card.Content style={{alignItems: 'center'}}>
            <Text style={styles.profile_text}>
              {this.state.profilInfo.subreddit.subscribers}
            </Text>
          </Card.Content>
        </Card>
        <Button
          style={styles.button}
          icon="logout"
          mode="contained"
          onPress={() => {
            AsyncStorage.clear();
          }}>
          Logout
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  reddit_color: {
    color: '#FF5700',
  },
  container: {
    marginTop: 30,
  },
  logo: {
    width: 66,
    height: 58,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#FF5700',
  },
});

export default Profil;
