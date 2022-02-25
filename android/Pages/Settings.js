import {tsParenthesizedType} from '@babel/types';
import * as React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {Text, Switch, Card} from 'react-native-paper';
import {APIgetSettings, APIupdateSettings} from '../API';

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      settingsInfo: null,
      isSwitchOn18: false,
      isSwitchOnNewFollower: false,
      isSwitchOnMention: false,
      isSwitchOnOnlineStatus: false,
      isSwitchOnProfanity: false,
      isSwitchOnReply: false,
      isSwitchOnDiscovery: false,
      isSwitchOnDigest: false,
      isSwitchOnMessage: false,
      isSwitchOnReplyPost: false,
      isSwitchOnReadMessage: false,
    };
  }

  componentDidMount() {
    APIgetSettings()
      .then(response => response.json())
      .then(json => this.setState({settingsInfo: json}))
      .then(() => {
        this.setState({isSwitchOn18: this.state.settingsInfo.over_18});
        this.setState({
          isSwitchOnNewFollower:
            this.state.settingsInfo.email_user_new_follower,
        });
        this.setState({
          isSwitchOnMention: this.state.settingsInfo.email_username_mention,
        });
        this.setState({
          isSwitchOnOnlineStatus: this.state.settingsInfo.show_presence,
        });
        this.setState({
          isSwitchOnProfanity: this.state.settingsInfo.no_profanity,
        });
        this.setState({
          isSwitchOnChat: this.state.settingsInfo.email_chat_request,
        });
        this.setState({
          isSwitchOnReply: this.state.settingsInfo.email_comment_reply,
        });
        this.setState({
          isSwitchOnDiscovery:
            this.state.settingsInfo.email_community_discovery,
        });
        this.setState({
          isSwitchOnDigest: this.state.settingsInfo.email_digests,
        });
        this.setState({
          isSwitchOnMessage: this.state.settingsInfo.email_messages,
        });
        this.setState({
          isSwitchOnReplyPost: this.state.settingsInfo.email_post_reply,
        });
        this.setState({
          isSwitchOnReadMessage: this.state.settingsInfo.mark_messages_read,
        });
      });
  }

  render() {
    if (this.state.settingsInfo === null) {
      return (
        <ActivityIndicator
          style={{margin: '50%'}}
          size="large"
          color="#FF5700"
        />
      );
    }
    const onToggleSwitch18 = () => {
      this.setState({isSwitchOn18: !this.state.isSwitchOn18});
      APIupdateSettings({over_18: !this.state.isSwitchOn18});
    };
    const onToggleSwitchNewFollower = () => {
      this.setState({isSwitchOnNewFollower: !this.state.isSwitchOnNewFollower});
      APIupdateSettings({
        email_user_new_follower: !this.state.isSwitchOnNewFollower,
      });
    };

    const onToggleSwitchMention = () => {
      this.setState({isSwitchOnMention: !this.state.isSwitchOnMention});
      APIupdateSettings({
        email_username_mention: !this.state.isSwitchOnMention,
      });
    };

    const onToggleSwitchOnlineStatus = () => {
      this.setState({
        isSwitchOnOnlineStatus: !this.state.isSwitchOnOnlineStatus,
      });
      APIupdateSettings({show_presence: !this.state.isSwitchOnOnlineStatus});
    };

    const onToggleSwitchOnProfanity = () => {
      this.setState({isSwitchOnProfanity: !this.state.isSwitchOnProfanity});
      APIupdateSettings({no_profanity: !this.state.isSwitchOnProfanity});
    };

    const onToggleSwitchOnChat = () => {
      this.setState({isSwitchOnChat: !this.state.isSwitchOnChat});
      APIupdateSettings({email_chat_request: !this.state.isSwitchOnChat});
    };
    const onToggleSwitchOnReply = () => {
      this.setState({isSwitchOnReply: !this.state.isSwitchOnReply});
      APIupdateSettings({email_comment_reply: !this.state.isSwitchOnReply});
    };
    const onToggleSwitchOnDiscovery = () => {
      this.setState({isSwitchOnDiscovery: !this.state.isSwitchOnDiscovery});
      APIupdateSettings({
        email_community_discovery: !this.state.isSwitchOnDiscovery,
      });
    };
    const onToggleSwitchOnDigest = () => {
      this.setState({isSwitchOnDigest: !this.state.isSwitchOnDigest});
      APIupdateSettings({email_digests: !this.state.isSwitchOnDigest});
    };
    const onToggleSwitchOnMessage = () => {
      this.setState({isSwitchOnMessage: !this.state.isSwitchOnMessage});
      APIupdateSettings({email_messages: !this.state.isSwitchOnMessage});
    };
    const onToggleSwitchOnReplyPost = () => {
      this.setState({isSwitchOnReplyPost: !this.state.isSwitchOnReplyPost});
      APIupdateSettings({email_post_reply: !this.state.isSwitchOnReplyPost});
    };
    const onToggleSwitchOnReadMessage = () => {
      this.setState({isSwitchOnReadMessage: !this.state.isSwitchOnReadMessage});
      APIupdateSettings({
        mark_messages_read: !this.state.isSwitchOnReadMessage,
      });
    };

    return (
      <View style={style.view}>
        <Text style={style.category}> ACCOUNT PARAMETERS</Text>
        <Card style={style.card}>
          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={style.settings}> Show online status ?</Text>
            <Switch
              color="#FF5700"
              style={style.switch}
              value={this.state.isSwitchOnOnlineStatus}
              onValueChange={onToggleSwitchOnlineStatus}
            />
          </Card.Content>
          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={style.settings}> I'm legally over 18 ?</Text>
            <Switch
              color="#FF5700"
              style={style.switch}
              value={this.state.isSwitchOn18}
              onValueChange={onToggleSwitch18}
            />
          </Card.Content>
          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={style.settings}> Don't display injuries ?</Text>
            <Switch
              color="#FF5700"
              style={style.switch}
              value={this.state.isSwitchOnProfanity}
              onValueChange={onToggleSwitchOnProfanity}
            />
          </Card.Content>
        </Card>
        <Text style={style.category}> NOTIFICATIONS</Text>
        <Card style={style.card}>
          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={style.settings}> Notify me of new follower ?</Text>
            <Switch
              color="#FF5700"
              style={style.switch}
              value={this.state.isSwitchOnNewFollower}
              onValueChange={onToggleSwitchNewFollower}
            />
          </Card.Content>
          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={style.settings}> Notify me of mention me ?</Text>
            <Switch
              color="#FF5700"
              style={style.switch}
              value={this.state.isSwitchOnMention}
              onValueChange={onToggleSwitchMention}
            />
          </Card.Content>
          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={style.settings}> Notify me of chat invitation ?</Text>
            <Switch
              color="#FF5700"
              style={style.switch}
              value={this.state.isSwitchOnChat}
              onValueChange={onToggleSwitchOnChat}
            />
          </Card.Content>
          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={style.settings}> Notify me of comment my reply ?</Text>
            <Switch
              color="#FF5700"
              style={style.switch}
              value={this.state.isSwitchOnReply}
              onValueChange={onToggleSwitchOnReply}
            />
          </Card.Content>
          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={style.settings}>
              {' '}
              Notify me of new community discovery ?
            </Text>
            <Switch
              color="#FF5700"
              style={style.switch}
              value={this.state.isSwitchOnDiscovery}
              onValueChange={onToggleSwitchOnDiscovery}
            />
          </Card.Content>
          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={style.settings}> Notify me of new message ?</Text>
            <Switch
              color="#FF5700"
              style={style.switch}
              value={this.state.isSwitchOnMessage}
              onValueChange={onToggleSwitchOnMessage}
            />
          </Card.Content>
          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={style.settings}> Notify me of reply to my post ?</Text>
            <Switch
              color="#FF5700"
              style={style.switch}
              value={this.state.isSwitchOnReplyPost}
              onValueChange={onToggleSwitchOnReplyPost}
            />
          </Card.Content>
          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={style.settings}> Enable Email digests ?</Text>
            <Switch
              color="#FF5700"
              style={style.switch}
              value={this.state.isSwitchOnDigest}
              onValueChange={onToggleSwitchOnDigest}
            />
          </Card.Content>
        </Card>
        <Text style={style.category}> MESSAGES</Text>
        <Card style={style.card}>
          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={style.settings}> Mark messages as read ?</Text>
            <Switch
              color="#FF5700"
              style={style.switch}
              value={this.state.isSwitchOnReadMessage}
              onValueChange={onToggleSwitchOnReadMessage}
            />
          </Card.Content>
        </Card>
      </View>
    );
  }
}

const style = StyleSheet.create({
  view: {
    backgroundColor: '#f2f0f0',
    marginTop: 10,
  },
  card: {
    marginBottom: 10,
  },
  switch: {
    marginBottom: 10,
  },
  settings: {
    textAlign: 'left',
    marginBottom: 10,
  },
  category: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'grey',
  },
});

export default Settings;
