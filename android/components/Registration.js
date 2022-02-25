import {authorize} from 'react-native-app-auth';
import {Button, Image, View} from 'react-native';
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {app_store} from '../App';
import { height } from 'dom-helpers';

const config = {
  redirectUrl: 'com.myapp://oauth',
  clientId: 'p3h0u8YNbgxNgNoeOXpPIQ',
  clientSecret: '',
  scopes: ['identity', 'account', 'read', 'mysubreddits', 'subscribe'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
    tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
  },
  customHeaders: {
    token: {
      Authorization: 'Basic <base64encoded clientID:>',
    },
  },
};

class AuthButton extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <View>
        <Image
          source={{
            uri: 'https://live.staticflickr.com/5567/31437486496_cf5cab625e_b.jpg',
          }}
          style={{width: '100%', height: '80%', marginTop: '10%', marginBottom: '10%'}}
        />
        <Button
          color="#FF5700"
          title="Authorize the app"
          onPress={() => {
            authorize(config).then(response => {
              AsyncStorage.setItem('accessToken', response.accessToken);
              AsyncStorage.setItem(
                'expirationToken',
                response.accessTokenExpirationDate,
              );
              app_store['token'] = response.accessToken;
              app_store['expirationDate'] = response.accessTokenExpirationDate;
              this.props.callback({
                token: response.accessToken,
                expirationDate: response.accessTokenExpirationDate,
              });
            });
          }}
        />
      </View>
    );
  }
}

export {AuthButton};
