// import { Button, View, Text } from 'react-native';
import * as React from 'react';
import NavBar from './components/NavBar';
import {AuthButton} from './components/Registration';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from 'react-native-paper';
import {ActivityIndicator} from 'react-native';

let app_store = {};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      token: 0,
      expirationDate: 0,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('accessToken').then(response => {
      this.setState({token: response});
      app_store['token'] = response;
    });
    AsyncStorage.getItem('expirationToken').then(response => {
      this.setState({expirationDate: response});
      app_store['expirationDate'] = response;
    });
  }

  handleCallback = data => {
    this.setState(data);
  };

  render() {
    if (this.state.token === 0 || this.state.expirationDate === 0) {
      return (
        <ActivityIndicator
          style={{margin: '50%'}}
          size="large"
          color="#FF5700"
        />
      );
    }
    if (
      !this.state.token ||
      !this.state.expirationDate ||
      new Date(this.state.expirationDate).getTime() < new Date().getTime()
    ) {
      return <AuthButton callback={this.handleCallback} />;
    }
    return <NavBar />;
  }
}

export default App;

export {app_store};
